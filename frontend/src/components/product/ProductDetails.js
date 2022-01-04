import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../actions/productActions'
import { addItemToCart } from '../../actions/cartActions'
import { Link, useParams } from 'react-router-dom'
import { clearErrors } from '../../actions/userActions'
import { useSpring } from 'react-spring'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import Modal from '../modals/Modal'
import Review from '../modals/Review'
import Contact from '../modals/Contact'
import ListReviews from '../review/ListReviews'
import Lightbox from './Lightbox'

const ProductDetails = () => {   
    
    const id = useParams().id    
    const alert = useAlert()
    const dispatch = useDispatch()
    const [ quantity, setQuantity ] = useState(1)
    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [ modalType, setIModalType ] = useState()    
    const [ isLightboxVisible, setIsLightboxVisible ] = useState(false)    
    const [ imageIndex, setIImageIndex ] = useState(0)  
    const { loading, error, product } = useSelector(state => state.productDetails)
    const { user } = useSelector(state => state.auth)   

    const toggleModal = (modalType) => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)  
        setIModalType(modalType)   
    }   
    const toggleLightbox = (imgIndex) => {   
        setIImageIndex(imgIndex)      
        setIsLightboxVisible(wasLightboxVisible => !wasLightboxVisible)   
    } 
    const slideTopAnimation = useSpring({     
        opacity: isLightboxVisible ? 1 : 0,
        transform: isLightboxVisible ? `translateY(0%)` : `translateY(-100%)`
    })
    useEffect( () => {   
        dispatch(getProductDetails(id))
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }          
    }, [dispatch, alert, error, id])

    const addToCart = () => {
        dispatch(addItemToCart(id, quantity))
        alert.success('Item Added to Cart')
    }
    const increaseQty = () => {
        const count = document.querySelector('.count')
        if(count.valueAsNumber >= product.stock) { return }
        const qty = count.valueAsNumber + 1
        setQuantity(qty)
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if(count.valueAsNumber <= 1) { return }
        const qty = count.valueAsNumber - 1
        setQuantity(qty)
    }  

    return (
        <Fragment>  
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="bg-grey">
                        <div className="container">         
                            <div className="wrapper">
                                <div className={product.orientation !== 'Landscape' ? 'portrait parent' : 'landscape'}>

                                    <div>
                                        {product.images && (
                                            <img src={product.images[0].url} alt={product.name} />
                                        )}
                                        <ul className="thumbnails">
                                        {product.images && product.images.map((image, index) => (
                                            <li 
                                                key={image.public_id}
                                                onClick={() => toggleLightbox(index)}
                                            >
                                                <img 
                                                    src={image.thumbUrl} 
                                                    alt={product.name} 
                                                    className="centered-image"
                                                />
                                            </li>
                                        ))}
                                        </ul>                                       
                                    </div>                                    

                                    <div className="information parent">  
                                        <h1 className="text-center">{product.name}</h1>
                                        <table>  
                                            <tbody>  
                                                <tr>
                                                    <th><h6>Artist</h6></th>
                                                    <td><Link to="!#"><b>{product.artist}</b></Link></td>
                                                </tr>       
                                                <tr>
                                                    <th><h6>Dimensions</h6></th>
                                                    <td>{product.width} cm <small>x</small> {product.height} cm</td>
                                                </tr>
                                                <tr>
                                                    <th><h6>Media</h6></th>
                                                    <td>{product.media}</td>
                                                </tr>                    
                                                <tr>
                                                    <th><h6>Published</h6></th>
                                                    <td>                                                       
                                                        {product.datePublished && (                                                        
                                                            new Date(product.datePublished).getFullYear()                                                       
                                                        )}                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th><h6>Status</h6></th>
                                                    <td>                                              
                                                        {product.stock > 0 ? product.stock : null}                                                     
                                                        &nbsp;
                                                        {product.stock > 0 ? 'in Stock' : 'Out of Stock'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th><h6>Price</h6></th>    
                                                    <td className="whitespace-nowrap">
                                                        $
                                                        <b>
                                                        {product.price && (
                                                            product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                        )}
                                                        </b>
                                                        &nbsp;CAN 
                                                    </td>
                                                </tr>                                              
                                                <tr>
                                                    <th><h6>Reviews</h6></th>    
                                                    <td className="whitespace-nowrap">
                                                    <div className="rating-outer">
                                                        <div className="rating-inner" style={{ width: `${( product.ratings / 5 ) * 100}%` }}></div>
                                                    </div>
                                                    &nbsp;
                                                    <small>({product.numOfReviews} Reviews)</small>  
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                    {user ? 
                                                    <button onClick={() => {toggleModal(<Review />)}}>
                                                        Post Review
                                                    </button>                         
                                                    : 
                                                    <Link to="/login">Login to post a review</Link>
                                                    } 
                                                    </td>
                                                </tr>
                                            </tbody>     
                                        </table>  

                                        <div> 
                                            <div className="text-center">  
                                                <button
                                                    className="submit"
                                                    onClick={addToCart}
                                                    disabled={product.stock === 0 ? true : false}
                                                >
                                                    Add to Cart 
                                                    <i className="fa fa-chevron-right"/>
                                                </button>     
                                            </div>  
                                            <br />
                                            <div className="stockcounter">
                                                Quantity &nbsp;
                                                <span className={quantity === 1 ? 'inactive minus' : 'minus'} onClick={decreaseQty}>
                                                    <i className="fa fa-minus-circle"/>
                                                </span>

                                                <input 
                                                    type="number" 
                                                    value={product.stock === 0 ? 0 : quantity} 
                                                    readOnly 
                                                />

                                                <span  className={quantity === product.stock ? 'inactive plus' : 'plus'} onClick={increaseQty}>
                                                    <i className="fa fa-plus-circle"/>
                                                </span>
                                            </div>  
                                        </div>
                                    </div>
                                </div>  
                                <br />                                                                  
                                {product.reviews && product.reviews.length > 0 && (   
                                    
                                    <ListReviews reviews={product.reviews} />   
                                                                  
                                )}
                            </div>
                        </div>   
                    </div>

                    <div className="container">	
                        <div className="wrapper">	
                            <div className="parent">        
                                <div>
                                    <h3>Share</h3>                                
                                    <h2>Spread the word about {product.name}</h2>                                    
                                    <div className="icons">  
                                        <Link to="!#" target="_blank">
                                            <i className="fa fa-facebook" aria-hidden="true"></i>
                                        </Link>
                                        <Link to="!#" target="_blank">
                                            <i className="fa fa-twitter" aria-hidden="true"></i>
                                        </Link>
                                    </div>                                
                                </div>
                                <div style={{ width: "40px" }} />
                                <div>
                                    <p>                                
                                        {product.description}
                                        <br />                                        
                                        <button onClick={() => {toggleModal(<Contact />)}}>
                                            <i className="fa fa-envelope" aria-hidden="true"></i> 
                                            &nbsp; Contact Us
                                        </button>
                                    </p>
                                </div>                                
                            </div>                             
                        </div>                        
                    </div>  

                    <div className={product.orientation !== 'Landscape' ? 'container' : ''}>
                        <div className="wrapper full-size">                              
                            {product.images && (
                                <img src={product.images[0].url} alt={product.name} />
                            )} 
                        </div>
                    </div>
                    
                    {isLightboxVisible && (
                        <Lightbox 
                            product={product} 
                            isLightboxVisible={isLightboxVisible} 
                            toggleLightbox={() => toggleLightbox(imageIndex)}  
                            slideTopAnimation={slideTopAnimation}
                            imgIndex={imageIndex}  
                        />
                    )}                        
                    
                    <Modal
                        isModalVisible={isModalVisible} 
                        onBackdropClick={toggleModal}   
                        content={modalType}
                    />        
                </Fragment>
            )}
        </Fragment>        
    )
}

export default ProductDetails
