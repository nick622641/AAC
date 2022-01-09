import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {

    return (
        
        <div className="checkout-progress">
            
            {shipping ? <Link to="/shipping">
                        <div className="triangle2-active"></div>
                        <div className="step active-step">Shipping</div>
                        <div className="triangle-active"></div>
                    </Link>
                    : <Link to="#!">
                        <div className="triangle2-incomplete"></div>
                        <div className="step incomplete">Shipping</div>
                        <div className="triangle-incomplete"></div>
                    </Link>
            }

            {confirmOrder ? <Link to="/order/confirm">
                        <div className="triangle2-active"></div>
                        <div className="step active-step">Confirm</div>
                        <div className="triangle-active"></div>
                    </Link>
                    : <Link to="#!">
                        <div className="triangle2-incomplete"></div>
                        <div className="step incomplete">Confirm</div>
                        <div className="triangle-incomplete"></div>
                    </Link>
            }

            {payment ? <Link to="/payment">
                        <div className="triangle2-active"></div>
                        <div className="step active-step">Payment</div>
                        <div className="triangle-active"></div>
                    </Link>
                    : <Link to="#!">
                        <div className="triangle2-incomplete"></div>
                        <div className="step incomplete">Payment</div>
                        <div className="triangle-incomplete"></div>
                    </Link>
            }

        </div>
    )
}

export default CheckoutSteps
