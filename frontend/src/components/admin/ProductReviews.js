import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProductReviews, deleteReview, clearErrors } from '../../actions/productActions'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const ProductReviews = () => {
   
    const alert = useAlert()
    const dispatch = useDispatch()
    const [ productId, setProductId ] = useState('')
    const { error, reviews } = useSelector( state => state.productReviews )
    const { isDeleted, error: deleteError } = useSelector( state => state.review )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ reviewId,  setReviewId ] = useState('')

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        } 
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }          
        if(productId !== '') {
            dispatch(getProductReviews(productId))
        }
        if(isDeleted) {
            alert.success('Review Deleted Successfully')            
            dispatch({ type: DELETE_REVIEW_RESET })
        }  
    }, [dispatch, isDeleted, alert, error, productId, deleteError])

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId))
    }   
    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(getProductReviews(productId))
    }
    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'disabled',
                    width: 200
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc',
                    width: 75
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'disabled',
                    width: 100
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc',
                    width: 120
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                    width: 100                  
                }
            ],
            rows: []
        }

        reviews.forEach( review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment, 
                user: review.name,                
                actions:                 
                    <Fragment> 
                        <IconButton 
                            onClick={() => {
                                setIsModalVisible(!isModalVisible)
                                setReviewId(review._id)
                            }}
                        >
                            <DeleteOutlineIcon sx={{ color: "red" }} />
                        </IconButton> 
                    </Fragment> 
            })
        })

        return data

    }

    return (

        <Fragment>

            <MetaData title={'Product Reviews'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article>                            

                        <div className="user-form cart"> 

                            <h1>Product Reviews</h1>

                            <form onSubmit={submitHandler}>                            
                                <input                                    
                                    placeholder="Enter Product ID"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                />
                            </form> 

                            <br /> 

                            {reviews && reviews.length > 0 ? (
                                <MDBDataTableV5 
                                    data={setReviews()}   
                                    fullPagination   
                                    scrollX  
                                    scrollY   
                                    searchTop
                                    searchBottom={false}  
                                /> 
                            ) : (
                                <p>No Reviews</p>
                            )}

                            <Link to="/dashboard">
                                <Fab size="small" className="close" color="primary">
                                    <CloseIcon />
                                </Fab>
                            </Link>

                        </div>
                       
                    </article>

                </div>

            </div>

            <Modal
                isModalVisible={isModalVisible} 
                onBackdropClick={toggleModal}   
                content={
                    <Confirm 
                        onBackdropClick={toggleModal} 
                        onConfirm={() => deleteReviewHandler(reviewId)} 
                        message="Delete Review"
                    />
                }
            />
            
        </Fragment>

    )

}

export default ProductReviews
