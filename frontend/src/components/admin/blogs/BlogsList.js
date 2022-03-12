import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getAdminBlogs, deleteBlog, clearErrors } from '../../../actions/blogActions'
import { DELETE_BLOG_RESET } from '../../../constants/blogConstants'
import MetaData from '../../layouts/MetaData'
import Loader from '../../layouts/Loader'
import Sidebar from '../Sidebar'
import Modal from '../../modals/Modal'
import Confirm from '../../modals/Confirm'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Avatar from '@mui/material/Avatar'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Tooltip } from '@mui/material';

const BlogsList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, blogs } = useSelector( state => state.blogs )
    const { loading: isLoading, error: deleteError, isDeleted } = useSelector( state => state.blog  )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,              setId             ] = useState('')
    const [ fullscreen,      setFullscreen     ] = useState(false)

    useEffect(() => {

        dispatch(getAdminBlogs())

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if(isDeleted) {
            alert.success('Blog Deleted Successfully')    
            dispatch({ type: DELETE_BLOG_RESET })            
        }
        
    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const deleteBlogHandler = (id) => {
        dispatch(deleteBlog(id))
    } 

    const setBlogs = () => {
        const data = {
            columns: [
                {
                    label: 'Preview',
                    field: 'url',
                    sort: 'disabled',
                    width: 75
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                    width: 150                
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc',
                    width: 120
                },
                {
                    label: 'Comments',
                    field: 'comments',
                    sort: 'asc',
                    width: 90
                }                
            ],
            rows: []
        }

        blogs && blogs.forEach( blog => {     
            data.rows.push({
                url: <Link to={`/blog/${blog.slug}`}>
                        <Avatar
                            src={blog.images[0].thumbUrl} 
                            alt={blog.title} 
                            sx={{ width: 50, height: 50 }}
                        />          
                    </Link>,
                actions: <Fragment>
                        <CopyToClipboard text={blog._id}>
                            <IconButton onClick={() => alert.success('ID Copied')}>
                                <Tooltip title="Copy ID" arrow>
                                    <ContentCopyIcon color="primary" />  
                                </Tooltip>
                            </IconButton>  
                        </CopyToClipboard>    
                        <Link to={`/admin/blog/${blog._id}`}>
                            <Tooltip title="Update" arrow>
                                <IconButton>
                                    <EditOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </Link> 
                        <Tooltip title="Delete" arrow>
                            <IconButton 
                                onClick={() => {
                                    setIsModalVisible(!isModalVisible)
                                    setId(blog._id)
                                }}                                
                            >
                                <DeleteOutlineIcon color="danger" />
                            </IconButton> 
                        </Tooltip>                     
                    </Fragment>,
                title: blog.title,    
                comments: blog.numOfComments           
               
            })
        })

        return data
    }   

    return (

        <Fragment>

            <MetaData title={'All Products'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>

                        <Sidebar />

                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>

                        {loading || isLoading ? <Loader /> : (

                            <Fragment>  

                                <div className="user-form">

                                    <h1>All Blogs</h1>                                
                                
                                    <MDBDataTableV5 
                                        data={setBlogs()}   
                                        fullPagination   
                                        scrollX  
                                        searchTop
                                        searchBottom={false}  
                                    />                                 

                                    <Link to="/admin/dashboard">
                                        <Fab 
                                            size="small" 
                                            color="primary"
                                            sx={{ position: 'absolute', top: 10, right: 10 }}
                                        >
                                            <CloseIcon />
                                        </Fab>
                                    </Link>

                                    <Tooltip title="Expand" arrow>
                                        <IconButton 
                                            color="primary" 
                                            sx={{ position: 'absolute', top: 10, left: 10 }}
                                            onClick={() => setFullscreen(!fullscreen)}
                                        >
                                            <FitScreenIcon />
                                        </IconButton>
                                    </Tooltip>

                                </div>

                            </Fragment>

                        )}

                    </article>

                </div>

            </div>

            <Modal
                isModalVisible={isModalVisible} 
                onBackdropClick={toggleModal}   
                content={
                    <Confirm 
                        onBackdropClick={toggleModal} 
                        onConfirm={() => deleteBlogHandler(id)} 
                        message="Delete blog"
                    />
                }
            />
            
        </Fragment>

    )

}

export default BlogsList
