import React, { Fragment, useState } from 'react'
import Review from '../modals/Review'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Rating from '@mui/material/Rating'
import parse from 'html-react-parser'
import FormattedDate from '../layouts/FormattedDate'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'

const ListReviews = ({ reviews, user, toggleModal, deleteReviewHandler }) => {

    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [ reviewId,      setReviewId      ] = useState('')

    return (

        <Fragment>

            <h3>Reviews</h3>

            <div className="parent">

                {reviews && reviews.map(review => (

                    <div key={review._id}>

                        <Rating 
                            value={review.rating} 
                            sx={{ color: "var(--primary-color)" }} 
                            readOnly
                        />  
                         
                        <p style={{ lineHeight: "50px" }}>
                            by <b>{review.name}</b> on <FormattedDate iso={review.reviewCreatedAt} format="dateTime" />
                            
                            {user && user._id === review.user && (
                            
                                <Fragment>

                                    <IconButton onClick={() => {toggleModal(<Review rating={review.rating} comment={review.comment} />)}}>
                                        <EditOutlinedIcon/>
                                    </IconButton>    
                                    
                                    <IconButton 
                                        onClick={() => {
                                            setIsModalVisible(!isModalVisible)
                                            setReviewId(review._id)
                                        }}
                                    >
                                        <DeleteOutlineIcon color="danger" />
                                    </IconButton>

                                </Fragment>
                        
                            )}
                        </p>

                        <div style={{ backgroundColor: "white", borderRadius: "5px", padding: "10px" }}>
                            {parse(review.comment)}
                        </div>

                    </div>

                ))}

            </div>

            <Modal
                isModalVisible={isModalVisible} 
                onBackdropClick={() => setIsModalVisible(!isModalVisible)}   
                content={
                    <Confirm 
                        onBackdropClick={() => setIsModalVisible(!isModalVisible)} 
                        onConfirm={() => deleteReviewHandler(reviewId)} 
                        message="Delete Review"
                    />
                }
            />
                
        </Fragment>
        
    )

}

export default ListReviews
