import React, { Fragment, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import { Button } from '@mui/material'
import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'
import FormattedPrice from '../layouts/FormattedPrice'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'

const ConfirmOrder = () => {

    const paypal = useRef()
    const navigate = useNavigate()

    const { cartItems, shippingInfo } = useSelector( state => state.cart )
    const { user                    } = useSelector( state => state.auth )
    
    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                    {
                        description: "Artwork",
                        amount: {
                        currency_code: "CAD",
                        value: totalPrice,
                        },
                    },
                    ],
                })
                },
                onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log(order)
                },
                onError: (err) => {
                console.log(err)
                },
            })
            .render(paypal.current)
    }, [totalPrice])

    const proceedToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }

    const setCartItems = () => {
        const data = {
            columns: [
                {
                    label: 'Preview',
                    field: 'url',
                    sort: 'disabled',
                    width: 75
                },                
                {
                    label: 'Title',
                    field: 'name',
                    sort: 'disabled',
                    width: 100
                },  
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'disabled',
                    width: 100
                },
                {
                    label: 'Sub Total',
                    field: 'sub',
                    sort: 'disabled',
                    width: 150
                }   
            ],
            rows: []
        }
       
        cartItems && cartItems.forEach( item => {
            let name = item.name.replace(/-/g, '_')    
            name = name.replace(/ /g, '-') 
            data.rows.push({
                url: <Link to={`/artwork/${name}`}>
                        <Avatar
                            src={item.image} 
                            alt={item.name} 
                            sx={{ width: 50, height: 50 }}
                        />                                          
                    </Link>,                  
                name: <Link to={`/artwork/${name}`}>{item.name}</Link>,
                price: <Fragment>
                            {item.quantity}
                            &nbsp;x&nbsp;
                            <FormattedPrice number={item.price} />
                        </Fragment>,         
                sub: <FormattedPrice number={(item.quantity * item.price)} />              
            })
        })

        return data
    }

    return (

        <Fragment>

            <MetaData title={'Confirm Order'} noIndex={true} />

            <div className="container">            

                <div className="wrapper d-flex">                                  

                    <div className="user-form"> 

                        <CheckoutSteps shipping confirmOrder /> 

                        <MDBDataTableV5 
                            className="cart-table"
                            data={setCartItems()}   
                            scrollX  
                            searchTop
                            searching={false} 
                            paging={false}
                            info={false}
                        />

                        <h4 className="text-center">Shipping Details</h4>                                       

                        <table className="top-align">
                        <tbody>                                                   
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <h6 className="text-right">Name</h6>
                                </td>
                                <td>{user && user.name}</td>
                            </tr>
                            <tr>
                                <td>
                                    <h6 className="text-right">Phone</h6>
                                </td>
                                <td>{shippingInfo.phoneNo}</td>
                            </tr>
                            <tr>
                                <td>
                                    <h6 className="text-right">Address</h6>
                                </td>
                                <td>
                                    {shippingInfo.address}
                                    <br />
                                    {shippingInfo.city}
                                    <br />
                                    {shippingInfo.postalCode.toUpperCase()}
                                    <br />
                                    {shippingInfo.country}
                                </td>
                            </tr>   
                        </tbody>
                        </table>

                        <h4 className="text-center">Order Summary</h4>

                        <table>
                        <tbody>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <h6 className="text-right">Subtotal</h6>
                                </td>
                                <td>
                                    <FormattedPrice number={itemsPrice} /> 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6 className="text-right">Shipping</h6>
                                </td>
                                <td>
                                    <FormattedPrice number={shippingPrice} /> 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6 className="text-right">Tax</h6>
                                </td>
                                <td>
                                    <FormattedPrice number={taxPrice} /> 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6 className="text-right">Total</h6>
                                </td>
                                <td>
                                    <FormattedPrice number={totalPrice} /> 
                                </td>
                            </tr>                        
                        </tbody>
                        </table>     

                        <h4 className="text-center">Choose a Payment Method</h4> 

                        <div>
                            <div ref={paypal}></div>
                            
                        </div>  

                        {/* <Button 
                            variant="outlined"
                            color="paypal"        
                            sx={{ width: '100%', mt: 1 }}
                        >       
                            <img src="/images/paypal.png" alt="Stripe Payment" style={{ width: '86px' }} />
                        </Button> */}

                        <Button  
                            variant="contained"   
                            color="stripe"                        
                            onClick={proceedToPayment}
                            sx={{ width: '100%', mt: 3 }}
                        >                           
                            <img src="/images/stripe.png" alt="Stripe Payment" style={{ width: '50px' }} />
                        </Button>

                        <Link to="/shipping">                              
                            <Fab 
                                size="small" 
                                className="close" 
                                color="primary"
                                sx={{ position: 'absolute', top: 10, right: 10 }}
                            >
                                <CloseIcon />
                            </Fab>
                        </Link>  

                    </div>              
                    
                </div>

            </div>

        </Fragment>

    )
    
}

export default ConfirmOrder
