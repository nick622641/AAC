import { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { newReview } from '../../actions/productActions'

function Review(props) {
    
    const id = useParams().id    
    const dispatch = useDispatch()
    const [ rating, setRating   ] = useState(props.rating)
    const [ comment, setComment ] = useState(props.comment)
    const { loading } = useSelector( state => state.newReview )  

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
                        star.classList.add('gold')
                        setRating(this.starValue)
                    } else {
                        star.classList.remove('gold')
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
        
    }, [])

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
                    <li className={rating > 0 ? "star gold" : "star"}><i className="fa fa-star"></i></li>
                    <li className={rating > 1 ? "star gold" : "star"}><i className="fa fa-star"></i></li>
                    <li className={rating > 2 ? "star gold" : "star"}><i className="fa fa-star"></i></li>
                    <li className={rating > 3 ? "star gold" : "star"}><i className="fa fa-star"></i></li>
                    <li className={rating > 4 ? "star gold" : "star"}><i className="fa fa-star"></i></li>
                </ul>    

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
