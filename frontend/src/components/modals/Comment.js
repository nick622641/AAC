import { Fragment, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { newComment } from '../../actions/blogActions'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import RichtextEdittor from "../layouts/RichtextEdittor"

function Comment(props) {
    
    const id = useParams().id    
    const dispatch = useDispatch()

    const { loading } = useSelector( state => state.newComment ) 
    
    const [ comment, setComment ] = useState( props.comment )         

    const commentHandler = (e)  => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('comment', comment)
        formData.set('blogId', id)
        dispatch(newComment(formData))  
    }
    
    return (  

        <Fragment>

            <h2>Submit Comment</h2>

            <form onSubmit={commentHandler}>    

                <RichtextEdittor text={comment} setText={setComment} />    
                
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

export default Comment
