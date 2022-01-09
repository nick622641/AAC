import React, { Fragment } from 'react'
import Review from '../modals/Review'

const ListReviews = ({ reviews, user, toggleModal }) => {

    return (

        <Fragment>

            <h3>Reviews</h3>

            <div className="parent">

            {reviews && reviews.map(review => (

                <div key={review._id}>
                    
                    <div className="rating-outer">
                        <div 
                            className="rating-inner" 
                            style={{ width: `${(review.rating / 5) * 100}%` }}
                        />
                    </div>
                    <p>
                        by <b>{review.name}</b> &nbsp; 
                        {user && user._id === review.user && (
                            <button 
                                onClick={() => {
                                    toggleModal(
                                        <Review rating={review.rating} comment={review.comment} />
                                )}}              
                            >
                                <i className="fa fa-pencil" />                               
                            </button>
                        )}
                    </p>
                    <p>{review.comment}</p>

                </div>

            ))}

            </div>
                
        </Fragment>
        
    )

}

export default ListReviews
