import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { newComment                } from '../../actions/blogActions'
import RichtextEditor                from '../layouts/richtext/RichtextEditor'
import LoadingButton                 from '@mui/lab/LoadingButton'
import SendIcon                      from '@mui/icons-material/Send'

const Comment = ({ comment }) => {
    
    const dispatch = useDispatch()

    const { loading } = useSelector( state => state.newComment ) 
    const { blog    } = useSelector( state => state.blogDetails )
    
    const [ _comment, setComment ] = useState( comment )         

    const commentHandler = (e)  => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('comment', _comment)
        formData.set('blogId', blog._id)
        dispatch(newComment(formData))  
    }
    
    return (  

        <Fragment>

            <h2>Submit Comment</h2>

            <form onSubmit={commentHandler}>    

                <RichtextEditor text={comment} setText={setComment} />    
                
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
