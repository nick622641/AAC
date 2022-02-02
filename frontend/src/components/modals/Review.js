import { Fragment, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { newReview } from '../../actions/productActions'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Rating from '@mui/material/Rating'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'

function Review(props) {
    
    const id = useParams().id    
    const dispatch = useDispatch()

    const { loading } = useSelector( state => state.newReview ) 
    
    const [ rating,  setRating  ] = useState( props.rating )
    const [ comment, setComment ] = useState( props.comment )         

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
                    style={{ fontSize: "32px", marginBottom: "20px" }}  
                    size="large"               
                    onChange={(event, newValue) => {
                        setRating(newValue)
                    }} 
                />               

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
  
                <LoadingButton 
                    type="submit"
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"                    
                    endIcon={<SendIcon />}
                    sx={{ mt: 4, width: '100%' }}
                >
                    Submit
                </LoadingButton>                            
                    
            </form>     

        </Fragment>

    )

}

export default Review
