import { Fragment, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { newReview } from '../../actions/productActions'
import Rating from '@mui/material/Rating'

function Review(props) {
    
    const id = useParams().id    
    const dispatch = useDispatch()
    const [ rating, setRating   ] = useState(props.rating)
    const [ comment, setComment ] = useState(props.comment)
    const { loading } = useSelector( state => state.newReview )  

    

    const reviewHandler = (e)  => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('rating', rating)
        formData.set('comment', comment)
        formData.set('productId', id)
        dispatch(newReview(formData))  
    }
    
    return (  

        <Fragment>

            <h2>Submit Review</h2>

            <form onSubmit={reviewHandler}>
                <Rating
                    value={rating}
                    sx={{ color: "var(--primary-color)" }}    
                    style={{ fontSize: "32px" }}  
                    size="large"               
                    onChange={(event, newValue) => {
                        setRating(newValue)
                    }} 
                />  

                <br />           

                <textarea 
                    placeholder="Review"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    required
                >
                </textarea>

                <br />
                <br />

                <button 
                    className="submit"                     
                    disabled={loading ? true : false}
                >
                    {loading ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i> : 'Submit'}                                                    
                </button>                               
                    
            </form>     

        </Fragment>

    )
}

export default Review
