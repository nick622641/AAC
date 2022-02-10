import React, { Fragment } from 'react'
import Comment from '../modals/Comment'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import parse from 'html-react-parser'

const ListComments = ({ comments, user, toggleModal }) => {

    return (

        <Fragment>

            <h3>Comments</h3>

            <div className="parent">

                {comments && comments.map(comment => (

                    <div key={comment._id}>              
                         
                        <p>
                            by <b>{comment.name}</b> on 
                            <b> {new Date(comment.commentCreatedAt).getDate()+ '/' + (new Date(comment.commentCreatedAt).getMonth() + 1) + '/' + new Date(comment.commentCreatedAt).getFullYear()}</b> &nbsp; 
                            
                            {user && user._id === comment.user && (
                            
                                <IconButton onClick={() => {toggleModal(<Comment comment={comment.comment} />)}}>
                                    <EditOutlinedIcon/>
                                </IconButton>                              
                        
                            )}
                        </p>

                        {parse(comment.comment)}

                    </div>

                ))}

            </div>
                
        </Fragment>
        
    )

}

export default ListComments
