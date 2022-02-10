import React, { Fragment } from 'react'
import Review from '../modals/Review'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Rating from '@mui/material/Rating'
import parse from 'html-react-parser'
import FormattedDate from '../layouts/FormattedDate'

const ListReviews = ({ reviews, user, toggleModal }) => {

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
                         
                        <p>
                            by <b>{review.name}</b> on <FormattedDate iso={review.reviewCreatedAt} format="dateTime" />
                            
                            {user && user._id === review.user && (
                            
                                <IconButton onClick={() => {toggleModal(<Review rating={review.rating} comment={review.comment} />)}}>
                                    <EditOutlinedIcon/>
                                </IconButton>                              
                        
                            )}
                        </p>

                        {parse(review.comment)}

                    </div>

                ))}

            </div>
                
        </Fragment>
        
    )

}

export default ListReviews
