import React, { Fragment, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart, emptyCart } from '../../actions/cartActions'
import { Button } from '@mui/material'
import FormattedPrice from '../layouts/FormattedPrice'
import MetaData from '../layouts/MetaData'
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
                    label: 'Quantity',
                    field: 'quantity',
                    sort: 'disabled',
                    width: 150
                },       
                {
                    label: <IconButton onClick={() => {setIsModalVisible(!isModalVisible)}}>
                                <DeleteForeverIcon color="danger" />
                            </IconButton>,
                    field: 'actions',
                    sort: 'disabled',
                    width: 100                
                }           
            ],
            rows: []
        }
       
        cartItems && cartItems.forEach( item => {
            
            data.rows.push({
                url: <Link to={`/artwork/${item.slug}`}>
                        <Avatar
                            src={item.image} 
                            alt={item.name} 
                            sx={{ width: 50, height: 50 }}
                        />                                          
                    </Link>,                  
                name: <Link to={`/artwork/${item.slug}`}>{item.name}</Link>,
                price: <FormattedPrice number={item.price} />,
                quantity: <Fragment>
                            <div className="whitespace-nowrap"> 
                                <IconButton 
                                    className={item.quantity === 1 ? 'inactive' : ''}                                                 
                                    onClick={() => decreaseQty(item.slug, item.quantity)}
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
                                    onClick={() => increaseQty(item.slug, item.quantity, item.stock)}
                                >
                                    <AddCircleIcon 
                                        fontSize="small" 
                                        color={item.quantity === item.stock ? 'disabled' : 'primary'}
                                    />
                                </IconButton>                
                            </div>
                        </Fragment> ,
                actions: 
                    <IconButton onClick={() => removeCartItemHandler(item.product)}>
                        <DeleteOutlineIcon color="danger" />
                    </IconButton>               
            })
        })

        return data
    } 

    return (

        <Fragment>

            <MetaData title={'Your Cart'} noIndex={true} />

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

                            <MDBDataTableV5 
                                className="cart-table"
                                data={setCartItems()}   
                                scrollX  
                                searchTop
                                searching={false} 
                                paging={false}
                                info={false}
                            />                         

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
