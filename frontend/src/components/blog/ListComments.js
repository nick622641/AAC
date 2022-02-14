import React, { Fragment, useState } from 'react'
import Comment from '../modals/Comment'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import parse from 'html-react-parser'
import FormattedDate from '../layouts/FormattedDate'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'
import { Avatar } from '@mui/material'

const ListComments = ({ comments, user, toggleModal, deleteCommentHandler }) => {

    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [ commentId,      setCommentId      ] = useState('')

    return (

        <Fragment>

            <h3>Comments</h3>

            <div>

                {comments && comments.map(comment => (

                    <div key={comment._id}>  
                         
                        <p style={{ lineHeight: "50px" }}>
                            <IconButton>                                                  
                                <Avatar 
                                    alt={user && user.name} 
                                    src={comment.avatar && comment.avatar.url}                                         
                                />
                            </IconButton>    
                            by <b>{comment.name}</b> on &nbsp;
                            <FormattedDate iso={comment.commentCreatedAt} format="dateTime" />
                            
                            {user && user._id === comment.user && (

                                <Fragment>
                            
                                    <IconButton onClick={() => {toggleModal(<Comment comment={comment.comment} />)}}>
                                        <EditOutlinedIcon/>
                                    </IconButton>   
                                    
                                    <IconButton 
                                        onClick={() => {
                                            setIsModalVisible(!isModalVisible)
                                            setCommentId(comment._id)
                                        }}
                                    >
                                        <DeleteOutlineIcon color="danger" />
                                    </IconButton> 

                                </Fragment>                        
                        
                            )}
                        </p>

                        <div className="comment">
                            {parse(comment.comment)}
                        </div>

                    </div>

                ))}

            </div>

            <Modal
                isModalVisible={isModalVisible} 
                onBackdropClick={() => setIsModalVisible(!isModalVisible)}   
                content={
                    <Confirm 
                        onBackdropClick={() => setIsModalVisible(!isModalVisible)} 
                        onConfirm={() => deleteCommentHandler(commentId)} 
                        message="Delete Comment"
                    />
                }
            />
                
        </Fragment>
        
    )

}

export default ListComments
