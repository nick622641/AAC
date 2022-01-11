import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getProductDetails, getRelatedProducts } from '../../actions/productActions'
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import { clearErrors } from '../../actions/userActions'
import { useSpring } from 'react-spring'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import Modal from '../modals/Modal'
import Review from '../modals/Review'
import Contact from '../modals/Contact'
import ListReviews from '../review/ListReviews'
import Lightbox from './Lightbox'
import Callout from './Callout'
import Social from '../layouts/Social'
import FormattedPrice from '../layouts/FormattedPrice'

const ProductDetails = () => {   

    const id       = useParams().id    
    const alert    = useAlert()
    const dispatch = useDispatch()

    const { error: reviewError, success } = useSelector( state => state.newReview )
    const { loading, product, error     } = useSelector( state => state.productDetails )
    const { products                    } = useSelector( state => state.products )
    const { user, isAuthenticated       } = useSelector( state => state.auth )   

    const [ modalType,         setIModalType        ] = useState()    
    const [ quantity,          setQuantity          ] = useState(1)
    const [ imageIndex,        setIImageIndex       ] = useState(0)   
    const [ isModalVisible,    setIsModalVisible    ] = useState(false)
    const [ isLightboxVisible, setIsLightboxVisible ] = useState(false)          

    let rating = 0
    let comment = ''  

    if ( user && product && product.numOfReviews > 0 ) {
        for (let i = 0; i < product.numOfReviews; i++) {
            if ( product.reviews[i].user === user._id ) {                    
                rating = product.reviews[i].rating
                comment = product.reviews[i].comment
            }
        }
    } 

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
        dispatch(getRelatedProducts(product.artist))
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        } 
        if(reviewError) { 
            alert.error(reviewError)
            dispatch(clearErrors())
         } 
         if(success) {
            alert.success('Review Posted Successfully')
            dispatch({ type: NEW_REVIEW_RESET })
            setIsModalVisible(false)
        }          
    }, [dispatch, success, alert, error, reviewError, id, product.artist])

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

                    <div className="bg-grey product-details">

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

                                        <table className="middle-align">  
                                            <tbody>                                                 
                                                <tr>
                                                    <th><h6>Artist</h6></th>
                                                    <td><Link to="#!"><b>{product.artist}</b></Link></td>
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
                                                    <td className={product.stock === 0 ? "danger" : ""}>                                              
                                                        {product.stock > 0 ? product.stock : null}                                                     
                                                        &nbsp;
                                                        {product.stock > 0 ? 'in Stock' : 'Out of Stock'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th><h6>Price</h6></th>    
                                                    <td>
                                                        <span className="price">                                                                                                              
                                                            {product.price && (
                                                                <FormattedPrice number={product.price} />
                                                            )}  
                                                        </span>
                                                    </td>
                                                </tr>                                              
                                                <tr>
                                                    <th><h6>Reviews</h6></th>    
                                                    <td className="whitespace-nowrap">
                                                    <div className="rating-outer">
                                                        <div 
                                                            className="rating-inner" 
                                                            style={{ width: `${( product.ratings / 5 ) * 100}%` }}
                                                        />
                                                    </div>
                                                    &nbsp;
                                                    <small>({product.numOfReviews} Reviews)</small>  
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                    {user ? 
                                                    <button onClick={() => {
                                                        toggleModal(
                                                            <Review  rating={rating} comment={comment} />
                                                        )}}
                                                    >
                                                        <i className="fa fa-pencil" />
                                                        &nbsp; Post Review
                                                    </button>                         
                                                    : 
                                                    <Link to={`/login?redirect=artwork/${id}`}>
                                                        <i className="fa fa-lock" />
                                                        &nbsp; Login to Post a Review
                                                    </Link>
                                                    } 
                                                    </td>
                                                </tr>
                                                {isAuthenticated && user.role === 'admin' && (
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <Link to={`/admin/product/${product._id}`}>
                                                                <i className="fa fa-pencil" /> &nbsp;Edit Page
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )} 
                                            </tbody>     
                                        </table>  

                                        <br />

                                        <div> 
                                            <div className="text-center">  
                                                <button                                                    
                                                    className="submit"
                                                    onClick={addToCart}
                                                    disabled={product.stock === 0 ? true : false}
                                                >
                                                    Add to Cart 
                                                    <i className="fa fa-chevron-right" />
                                                </button>     
                                            </div>  
                                            <br />
                                            <div className="stockcounter text-center">
                                                Quantity &nbsp;
                                                <span className={quantity <= 1 ? 'inactive minus' : 'minus'} onClick={decreaseQty}>
                                                    <i className="fa fa-minus-circle" />
                                                </span>

                                                <input
                                                    className="count"
                                                    value={product.stock === 0 ? 0 : quantity} 
                                                    readOnly 
                                                />

                                                <span  className={quantity === product.stock || product.stock <= 1 ? 'inactive plus' : 'plus'} onClick={increaseQty}>
                                                    <i className="fa fa-plus-circle" />
                                                </span>
                                            </div>  
                                        </div>
                                        
                                    </div>
                                </div> 
                            </div>
                        </div>   
                    </div>

                    <div className="container">	
                        <div className="wrapper">	
                            <div className="parent">        
                                <div className="col-6">
                                    <h3>Share</h3>                                
                                    <h2>Spread the word about {product.name}</h2>                                    
                                    <div className="icons">  
                                        <Social />
                                    </div>                                
                                </div>
                                <div className="col-6">
                                    <p>                                
                                        {product.description}
                                        <br /><br />                                        
                                        <button onClick={() => {toggleModal(<Contact />)}}>
                                            <i className="fa fa-envelope" /> 
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

                    {product.reviews && product.reviews.length > 0 && (  
                        <div className="bg-grey">                                    
                            <div className="container">
                                <div className="wrapper">                                    
                                    <ListReviews 
                                        reviews={product.reviews} 
                                        user={user} 
                                        toggleModal={toggleModal}
                                    />   
                                </div>
                            </div>
                        </div>                                                        
                    )}  

                    {products.length > 1 && (
                        <Callout products={products} />                        
                    )}                    

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
