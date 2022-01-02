import React, { Fragment } from 'react'

const ListReviews = ({ reviews }) => {

    return (

        <Fragment>

            <h3>Reviews</h3>

            {reviews && reviews.map(review => (

                <div key={review._id}>
                    
                    <div className="rating-outer">
                        <div 
                            className="rating-inner" 
                            style={{ width: `${(review.rating / 5) * 100}%` }}
                        />
                    </div>
                    <p>by <b>{review.name}</b></p>
                    <p>{review.comment}</p>

                </div>

            ))}
                
        </Fragment>
    )

}

export default ListReviews
