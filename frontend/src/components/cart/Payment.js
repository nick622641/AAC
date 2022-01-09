import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { emptyCart } from '../../actions/cartActions'


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

            <div className="wrapper stage">

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
                        
                        <br />
                        <button 
                            className="submit"
                            disabled={processing ? true : false}
                        >    
                            {processing 
                                ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw" /> 
                                : `Pay - $${orderInfo && orderInfo.totalPrice} CAD`}
                        </button>

                        <Link to="/order/confirm"><i className="fa fa-times"/></Link>
            
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment

