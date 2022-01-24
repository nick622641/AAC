import { Fragment, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { newReview } from '../../actions/productActions'
import Rating from '@mui/material/Rating'
import CircularProgress from '@mui/material/CircularProgress'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

function Review(props) {
    
    const id = useParams().id    
    const dispatch = useDispatch()
    const [ rating, setRating   ] = useState( props.rating )
    const [ comment, setComment ] = useState( props.comment )
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

                <br /><br />      

                <div className="relative">
                    <CKEditor
                        editor={ClassicEditor}               
                        data={comment}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setComment(data)
                        }}
                    />
                    <input 
                        className="hidden-input" 
                        value={comment ? comment : ''} 
                        onChange={(e) => setComment(e.target.value)} 
                        required
                    />
                </div>

                <br /><br />

                <button 
                    className="submit"                     
                    disabled={loading ? true : false}
                >
                    {loading 
                        ? <CircularProgress color="primary" /> 
                        : 'Submit'
                    }                                                    
                </button>                               
                    
            </form>     

        </Fragment>

    )

}

export default Review
