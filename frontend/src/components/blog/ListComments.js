import React, { Fragment } from 'react'
import Comment from '../modals/Comment'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import parse from 'html-react-parser'
import FormattedDate from '../layouts/FormattedDate'

const ListComments = ({ comments, user, toggleModal }) => {

    return (

        <Fragment>

            <h3>Comments</h3>

            <div className="parent">

                {comments && comments.map(comment => (

                    <div key={comment._id}>              
                         
                        <p>
                            by <b>{comment.name}</b> on &nbsp;
                            <FormattedDate iso={comment.commentCreatedAt} format="dateTime" />
                            
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
