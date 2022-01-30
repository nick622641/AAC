import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { Link, useNavigate } from 'react-router-dom'
import { emptyCart } from '../../actions/cartActions'
import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'
import axios from 'axios'
import FormattedPrice from '../layouts/FormattedPrice'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}
const Payment = () => {

    const alert = useAlert()      
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const navigate = useNavigate()  
    const { user } = useSelector(state => state.auth)    
    const { error } = useSelector(state => state.newOrder)
    const { cartItems, shippingInfo } = useSelector(state => state.cart)

    const [ processing, setProcessing ] = useState(false)

    useEffect(() => {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    if(orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setProcessing(true)
        let res
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            res = await axios.post('/api/v1/payment/process', paymentData, config)
            const clientSecret = res.data.client_secret
            if(!stripe || !elements) { return }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if(result.error) {

                alert.error(result.error.message);
                setProcessing(false)   

            } else {
                // The payment is processed or not
                if(result.paymentIntent.status === 'succeeded') {                    
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }                    
                    dispatch(createOrder(order))
                    dispatch(emptyCart())
                    navigate('/success')                    
                } else {
                    alert.error('There was an issue while processing payment')
                }
            }

        } catch (error) {    
            setProcessing(false)      
            alert.error(error.response.data.message)
        }
    }

    return (
        <Fragment>

            <MetaData title={'Payment'} />

            <div className="container">            

            <div className="wrapper d-flex">

                    <form className="user-form" onSubmit={submitHandler}>

                        <CheckoutSteps shipping confirmOrder payment />

                        <table className="bordered-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <h6>Card Number</h6>                        
                                        <br />   
                                        <CardNumberElement
                                            className="input" 
                                            options={options}
                                        />                                        
                                        <p><small style={{ color: "grey" }}>Test data: 4000 0027 6000 3184</small></p>
                                        <br />
                                        <h6>Card Expiry</h6>
                                        <br />                                                                    
                                        <CardExpiryElement
                                            className="input"   
                                            options={options}
                                        />                                        
                                        <br />
                                        <h6>Card CVC</h6>
                                        <br />                                                                    
                                        <CardCvcElement
                                            className="input"   
                                            options={options}
                                        />                                        
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <br /><br />
                        
                        <button 
                            className="submit relative"
                            disabled={processing ? true : false}
                        >    
                            {processing 
                                ? <CircularProgress sx={{ color: "var(--primary-color)"}} />
                                : <FormattedPrice number={orderInfo && orderInfo.totalPrice} />
                            }
                        </button>

                        <Link to="/order/confirm">                              
                            <Fab 
                                size="small" 
                                className="close" 
                                color="primary"
                                sx={{ position: 'absolute', top: 10, right: 10 }}
                            >
                                <CloseIcon />
                            </Fab>
                        </Link>  
            
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment

