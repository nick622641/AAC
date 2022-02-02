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
import SendIcon from '@mui/icons-material/Send'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Avatar from '@mui/material/Avatar'
import { Button } from '@mui/material'

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

                <div className="wrapper d-flex">

                    <div className="user-form">

                    {cartItems.length === 0 
                    ? ( <Fragment>
                            <h1>Your Cart</h1> 
                            <p>You have not added anything to your shopping cart yet</p>                            
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            
                            <h1>Your Cart</h1> 

                            <div className="scrollX">

                                <table className="bordered-table">
                                    <tbody>
                                        <tr className="bg-grey">
                                            <th>Item</th>
                                            <th>Title</th>
                                            <th>Price</th>                                    
                                            <th>Quantity</th>                                    
                                            <th>                                   
                                                <IconButton onClick={() => {setIsModalVisible(!isModalVisible)}}>
                                                    <DeleteForeverIcon color="danger" />
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
                                                <td className="whitespace-nowrap">   

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
                                                        className="text-center"
                                                        style={{ width: '40px' }}                                              
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
                                                        <DeleteOutlineIcon color="danger" />
                                                    </IconButton>
                                                </th>                                        
                                            </tr>
                                        ))}    
                                    </tbody>
                                </table>

                            </div>

                            <h4>Order Summary</h4>
                            
                            <table>
                            <tbody>
                                <tr>
                                    <th><h6 className="text-right">Items</h6></th>
                                    <td className="whitespace-nowrap">
                                        {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)
                                    </td>
                                </tr>
                                <tr>
                                    <th><h6 className="text-right">Total</h6></th>
                                    <td>
                                        <b className="primary-color">
                                            <FormattedPrice number={totalPrice} /> 
                                        </b>                                                
                                    </td>
                                </tr>
                            </tbody>
                            </table>                               

                            <Button 
                                variant="contained" 
                                onClick={checkoutHandler}
                                endIcon={<SendIcon />}
                                sx={{ width: '100%', mt: 4 }}
                            >
                                Check Out
                            </Button>


                        </Fragment>

                    )}

                        <Fab 
                            size="small" 
                            color="primary"                             
                            onClick={() => navigate(-1)}
                            sx={{ position: 'absolute', top: 10, right: 10 }}
                        >
                            <CloseIcon />
                        </Fab>

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
