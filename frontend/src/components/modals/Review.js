import { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import { useAlert } from 'react-alert'
import { useNavigate, useParams } from 'react-router-dom'
import { newReview, clearErrors } from '../../actions/productActions'

function Review() {

    const id = useParams().id    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('')
    const { error: reviewError, success, loading } = useSelector(state => state.newReview)  

    function setUserRatings() {
        const stars = document.querySelectorAll('.star')
        stars.forEach((star, index) => {
            star.starValue = index + 1;
            ['click', 'mouseover', 'mouseout'].forEach( function(e) {
                star.addEventListener(e, showRatings)
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if(e.type === 'click') {
                    if(index < this.starValue) {
                        star.classList.add('orange')
                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }
                if(e.type === 'mouseover') {
                    if(index < this.starValue) {
                        star.classList.add('yellow')
                    } else {
                        star.classList.remove('yellow')
                    }
                }
                if(e.type === 'mouseout') {                    
                    star.classList.remove('yellow')              
                }
            })
        }
    }
    
    useEffect(() => {   
        setUserRatings()
        if(reviewError) { 
           alert.error(reviewError)
           dispatch(clearErrors())
        }
        if(success) {
            alert.success('Review posted successfully')
            dispatch({ type: NEW_REVIEW_RESET })
            navigate(`/artwork/${id}`)   
        }  
    }, [dispatch, navigate, alert, success, reviewError, id])

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

                <ul className="stars" >
                    <li className="star"><i className="fa fa-star"></i></li>
                    <li className="star"><i className="fa fa-star"></i></li>
                    <li className="star"><i className="fa fa-star"></i></li>
                    <li className="star"><i className="fa fa-star"></i></li>
                    <li className="star"><i className="fa fa-star"></i></li>
                </ul>               

                <textarea 
                    placeholder="Review"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    required
                >
                </textarea>

                <button 
                    className="submit" 
                    onClick={reviewHandler}
                    disabled={loading ? true : false}
                >
                    {loading ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i> : 'Submit'}                                                    
                </button>                               
                    
            </form>     

        </Fragment>

    )
}

export default Review
