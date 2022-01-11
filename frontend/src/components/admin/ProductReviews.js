import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProductReviews, deleteReview, clearErrors } from '../../actions/productActions'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'

const ProductReviews = () => {
   
    const alert = useAlert()
    const dispatch = useDispatch()
    const [ productId, setProductId ] = useState('')
    const { error, reviews } = useSelector( state => state.productReviews )
    const { isDeleted, error: deleteError } = useSelector( state => state.review )

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
        if ( window.confirm("Are you Sure?") === true ) {
            dispatch(deleteReview(id, productId))
        }        
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
                    sort: 'disabled'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'disabled'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled'                  
                }
            ],
            rows: []
        }

        reviews.forEach( review => {
            data.rows.push({
                id: <small>{review._id}</small>,
                rating: review.rating,
                comment: review.comment, 
                user: review.name,                
                actions:                 
                    <Fragment> 
                        <button onClick={() => deleteReviewHandler(review._id)}> 
                            <i className="fa fa-trash-o" />
                        </button> 
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
                                <MDBDataTable 
                                    className="mdb-table"
                                    data={setReviews()} 
                                />
                            ) : (
                                <p>No Reviews</p>
                            )}

                            <Link to="/dashboard"><i className="fa fa-times" /></Link>

                        </div>
                       
                    </article>

                </div>

            </div>
            
        </Fragment>

    )

}

export default ProductReviews
