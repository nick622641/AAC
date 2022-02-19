import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBlogComments, deleteComment, clearErrors } from '../../actions/blogActions'
import { DELETE_COMMENT_RESET } from '../../constants/blogConstants'
import { FormControl, TextField, Tooltip } from '@mui/material'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import parse from 'html-react-parser'
import FitScreenIcon from '@mui/icons-material/FitScreen'

const BlogComments = () => {
   
    const alert    = useAlert()
    const dispatch = useDispatch() 
    const { error, comments                   } = useSelector( state => state.blogComments )
    const { isDeleted, error: deleteError     } = useSelector( state => state.comment )
    const [ blogId,         setBlogId         ] = useState('')
    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [ commentId,      setCommentId      ] = useState('')
    const [ fullscreen,      setFullscreen     ] = useState(false)

    useEffect(() => {
        if(error) {
            return alert.error(error)
        } 
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }          
        if(blogId !== '') {
            dispatch(getBlogComments(blogId))
        }
        if(isDeleted) {
            alert.success('Comment Deleted Successfully')            
            dispatch({ type: DELETE_COMMENT_RESET })
        }  
    }, [dispatch, isDeleted, alert, error, blogId, deleteError])

    const deleteCommentHandler = (id) => {
        dispatch(deleteComment(id, blogId))
    }   
    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(getBlogComments(blogId))
    }
    const setComments = () => {
        const data = {
            columns: [
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc',
                    width: 120
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                    width: 100                  
                },              
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'disabled',
                    width: 100
                }                              
            ],
            rows: []
        }

        comments.forEach( c => {
            data.rows.push({
                user: c.name, 
                actions:                 
                    <Fragment> 
                        <IconButton 
                            onClick={() => {
                                setIsModalVisible(!isModalVisible)
                                setCommentId(c._id)
                            }}
                        >
                            <DeleteOutlineIcon color="danger" />
                        </IconButton> 
                    </Fragment> ,
                comment: parse(c.comment)                 
            })
        })

        return data

    }

    return (

        <Fragment>

            <MetaData title={'Blog Comments'} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>                            

                        <div className="user-form cart"> 

                            <h1>Blog Comments</h1>

                            <form onSubmit={submitHandler}>   
                                <FormControl fullWidth>
                                    <TextField 
                                        label="Enter Blog ID" 
                                        value={blogId}
                                        variant="standard"
                                        onChange={(e) => setBlogId(e.target.value)}
                                        sx={{ mb: 2 }}
                                    />                                 
                                </FormControl>     
                            </form> 

                            {comments && comments.length > 0 ? (
                                <MDBDataTableV5 
                                    data={setComments()}   
                                    fullPagination   
                                    scrollX  
                                    // scrollY   
                                    searchTop
                                    searchBottom={false}  
                                /> 
                            ) : (
                                <p>No Comments</p>
                            )}

                            <Link to="/admin/dashboard">
                                <Fab 
                                    size="small" 
                                    color="primary"
                                    sx={{ position: 'absolute', top: 10, right: 10 }}
                                >
                                    <CloseIcon />
                                </Fab>
                            </Link>

                            <Tooltip title="Expand">
                                <IconButton 
                                    color="primary" 
                                    sx={{ position: 'absolute', top: 10, left: 10 }}
                                    onClick={() => setFullscreen(!fullscreen)}
                            >
                                    <FitScreenIcon />
                                </IconButton>
                            </Tooltip>

                        </div>
                       
                    </article>

                </div>

            </div>

            <Modal
                isModalVisible={isModalVisible} 
                onBackdropClick={toggleModal}   
                content={
                    <Confirm 
                        onBackdropClick={toggleModal} 
                        onConfirm={() => deleteCommentHandler(commentId)} 
                        message="Delete Comment"
                    />
                }
            />
            
        </Fragment>

    )

}

export default BlogComments
