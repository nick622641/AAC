import React, { Fragment, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
        document.querySelector('.submit').disabled = true
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
                document.querySelector('.submit').disabled = false;
            } else {
                // The payment is processed or not
                if(result.paymentIntent.status === 'succeeded') {                    
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder(order))
                    navigate('/success')                    
                } else {
                    alert.error('There was an issue while processing payment')
                }
            }

        } catch (error) {
            alert.error(error.response.data.message);
            document.querySelector('.submit').disabled = false            
        }
    }

    return (
        <Fragment>

            <MetaData title={'Payment'} />

            <div className="container">

            <CheckoutSteps shipping confirmOrder payment />

            <div className="wrapper">

                    <form className="user-form" onSubmit={submitHandler}>

                        <h2>Payment</h2>

                        <h6>Card Number</h6>
                        <br />
                        <label>
                            
                            <CardNumberElement
                                className="input"                       
                                options={options}
                            />
                        </label>
                        <br />

                        <h6>Card Expiry</h6>
                        <br />
                        <label>                            
                            <CardExpiryElement
                                className="input"   
                                options={options}
                            />
                        </label>
                        <br />

                        <h6>Card CVC</h6>
                        <br />
                        <label>                            
                            <CardCvcElement
                                className="input"   
                                options={options}
                            />
                        </label>
                        <br />
                        <button className="submit">
                            {`Pay - $${orderInfo && orderInfo.totalPrice} CAD`}
                        </button>
            
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment

