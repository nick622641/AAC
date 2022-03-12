import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProductReviews, deleteReview, clearErrors } from '../../../actions/productActions'
import { DELETE_REVIEW_RESET } from '../../../constants/productConstants'
import { FormControl, TextField, Tooltip } from '@mui/material'
import MetaData from '../../layouts/MetaData'
import Sidebar from '../Sidebar'
import Modal from '../../modals/Modal'
import Confirm from '../../modals/Confirm'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import parse from 'html-react-parser'
import FitScreenIcon from '@mui/icons-material/FitScreen'

const ProductReviews = () => {
   
    const alert    = useAlert()
    const dispatch = useDispatch() 
    const { error, reviews                     } = useSelector( state => state.productReviews )
    const { isDeleted, error: deleteError      } = useSelector( state => state.review )
    const [ productId,       setProductId      ] = useState('')
    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ reviewId,        setReviewId       ] = useState('')
    const [ fullscreen,      setFullscreen     ] = useState(false)

    useEffect(() => {
        if(error) {
            return alert.error(error)
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
                    label: 'Actions',
                    field: 'actions',
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
                }                               
            ],
            rows: []
        }

        reviews.forEach( review => {
            data.rows.push({            
                user: review.name,
                rating: review.rating,
                actions:  
                    <Fragment> 
                        <Tooltip title="Delete" arrow>
                            <IconButton 
                                onClick={() => {
                                    setIsModalVisible(!isModalVisible)
                                    setReviewId(review._id)
                                }}
                            >
                                <DeleteOutlineIcon color="danger" />
                            </IconButton> 
                        </Tooltip>                       
                    </Fragment>, 
                comment: parse(review.comment)                
            })
        })

        return data

    }

    return (

        <Fragment>

            <MetaData title={'Product Reviews'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>                            

                        <div className="user-form cart"> 

                            <h1>Product Reviews</h1>

                            <form onSubmit={submitHandler}>   
                                <FormControl fullWidth>
                                    <TextField 
                                        label="Enter Product ID" 
                                        value={productId}
                                        variant="standard"
                                        onChange={(e) => setProductId(e.target.value)}
                                        sx={{ mb: 2 }}
                                    />                                 
                                </FormControl>     
                            </form> 

                            {reviews && reviews.length > 0 ? (
                                <MDBDataTableV5 
                                    data={setReviews()}   
                                    fullPagination   
                                    scrollX  
                                    // scrollY   
                                    searchTop
                                    searchBottom={false}  
                                /> 
                            ) : (
                                <p>No Reviews</p>
                            )}

                            <Link to="/admin/dashboard">
                                <Fab 
                                    size="small" 
                                    color="primary"
                                    sx={{ position: 'absolute', top: 10, right: 10 }}
                                >
                                    <CloseIcon />
                                </Fab>
                            </Link>

                            <Tooltip title="Expand" arrow>
                                <IconButton 
                                    color="primary" 
                                    sx={{ position: 'absolute', top: 10, left: 10 }}
                                    onClick={() => setFullscreen(!fullscreen)}
                            >
                                    <FitScreenIcon />
                                </IconButton>
                            </Tooltip>

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
