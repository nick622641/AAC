import React, { Fragment, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart, emptyCart } from '../../actions/cartActions'
import FormattedPrice from '../layouts/FormattedPrice'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'
import IconButton from '@mui/material/IconButton'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Avatar from '@mui/material/Avatar'

const Cart = () => {    
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItems } = useSelector( state => state.cart )
    const { isAuthenticated } = useSelector( state => state.auth )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)

    let totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }
    const emptyCartHandler = () => {   
        dispatch(emptyCart())
    }
    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1
        if(newQty > stock) { return }
        dispatch(addItemToCart(id, newQty))
    }
    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1
        if(newQty <= 0) { return }
        dispatch(addItemToCart(id, newQty))
    }
    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }
    const checkoutHandler = () => {    
        const link = isAuthenticated ? '/shipping' : '/login?redirect=shipping'    
        navigate(link)
    }

    return (

        <Fragment>

            <MetaData title={'Your Cart'} />

            <div className="container">

                <div className="wrapper">

                    <div className="user-form">

                    {cartItems.length === 0 
                    ? ( <Fragment>
                            <h2>Your Cart is Empty</h2> 
                            <Fab size="small" className="close" onClick={() => navigate(-1)}>
                                <CloseIcon />
                            </Fab>
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            
                            <h1>Your Cart</h1> 

                            <p><small><b>({cartItems.length} items)</b></small></p>

                            <table className="middle-align bordered-table">
                            <tbody>
                                <tr className="bg-grey">
                                    <td><h6>Item</h6></td>
                                    <td><h6>Title</h6></td>
                                    <td><h6>Price</h6></td>                                    
                                    <td><h6>Quantity</h6></td>                                    
                                    <th>                                   
                                        <IconButton onClick={() => {setIsModalVisible(!isModalVisible)}}>
                                            <DeleteForeverIcon sx={{ color: "red" }} />
                                        </IconButton>
                                    </th>
                                </tr>
                                {cartItems.map(item => (
                                    <tr key={item.product}>
                                        <td>
                                            <Link to={`/artwork/${item.product}`}>
                                                <Avatar
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    sx={{ width: 50, height: 50 }}
                                                />                                          
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/artwork/${item.product}`}>{item.name}</Link>
                                        </td>
                                        <td>
                                            <FormattedPrice number={item.price} />                                            
                                        </td>
                                        <td className="stockcounter">   

                                            <IconButton 
                                                className={item.quantity === 1 ? 'inactive' : ''}                                                 
                                                onClick={() => decreaseQty(item.product, item.quantity)}
                                            >
                                                <RemoveCircleIcon 
                                                    fontSize="small" 
                                                    color={item.quantity === 1 ? 'disabled' : 'primary'}
                                                />
                                            </IconButton>  

                                            <input                                                
                                                value={item.quantity} 
                                                readOnly 
                                            />

                                            <IconButton 
                                                className={item.quantity === item.stock ? 'inactive' : ''} 
                                                onClick={() => increaseQty(item.product, item.quantity, item.stock)}
                                            >
                                                <AddCircleIcon 
                                                    fontSize="small" 
                                                    color={item.quantity === item.stock ? 'disabled' : 'primary'}
                                                />
                                            </IconButton>
                                    
                                        </td>
                                        <th>     
                                            <IconButton onClick={() => removeCartItemHandler(item.product)}>
                                                <DeleteOutlineIcon sx={{ color: "red" }} />
                                            </IconButton>
                                        </th>                                        
                                    </tr>
                                ))}    
                            </tbody>
                            </table>

                            <h4>Order Summary</h4>
                            
                            <table>
                            <tbody>
                                <tr>
                                    <th><h6>Items</h6></th>
                                    <td style={{ whiteSpace: "nowrap" }}>
                                        {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)
                                    </td>
                                </tr>
                                <tr>
                                    <th><h6>Total</h6></th>
                                    <td>
                                        <b className="primary-color">
                                            <FormattedPrice number={totalPrice} /> 
                                        </b>                                                
                                    </td>
                                </tr>
                            </tbody>
                            </table>                                
                            <br />
                            <button className="submit" onClick={checkoutHandler}>
                                Check Out
                            </button>
                         
                            <Fab size="small"  color="primary" className="close" onClick={() => navigate(-1)}>
                                <CloseIcon />
                            </Fab>

                        </Fragment>

                    )}

                    </div>

                </div>

            </div>

            <Modal
                isModalVisible={isModalVisible} 
                onBackdropClick={toggleModal}   
                content={
                    <Confirm 
                        onBackdropClick={toggleModal} 
                        onConfirm={() => emptyCartHandler()} 
                        message="Empty Your Cart"
                    />
                }
            />

        </Fragment>

    )

}

export default Cart
