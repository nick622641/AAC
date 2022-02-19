import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getBlogDetails, getBlogs, deleteComment } from '../../actions/blogActions'
import { NEW_COMMENT_RESET, DELETE_COMMENT_RESET } from '../../constants/blogConstants'
import { clearErrors } from '../../actions/userActions'
import { useSpring } from 'react-spring'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import Modal from '../modals/Modal'
import Contact from '../modals/Contact'
import Lightbox from '../product/Lightbox'
import Social from '../layouts/Social'
import IconButton from '@mui/material/IconButton'
import EmailIcon from '@mui/icons-material/Email'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LoginIcon from '@mui/icons-material/Login'
import Sidebar from './Sidebar'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import Comment from '../modals/Comment'
import ListComments from './ListComments'
import FormattedDate from '../layouts/FormattedDate'
import RichtextOutput from '../layouts/RichtextOutput'

const BlogDetails = () => {   

    const query = useParams().title
    let title    = query.replace(/-/g, ' ')    
    title        = title.replace(/_/g, '-')  
    
    const alert    = useAlert()
    const dispatch = useDispatch()

    const { error: commentError, success } = useSelector( state => state.newComment )
    const { blogs                        } = useSelector( state => state.blogs )
    const { loading, blog, error         } = useSelector( state => state.blogDetails )
    const { user                         } = useSelector( state => state.auth )  
    const { isDeleted, error: deleteError } = useSelector( state => state.comment ) 

    const [ modalType,         setIModalType        ] = useState()    
    const [ imageIndex,        setIImageIndex       ] = useState(0)   
    const [ isModalVisible,    setIsModalVisible    ] = useState(false)
    const [ isLightboxVisible, setIsLightboxVisible ] = useState(false)      

    const tags = blog.tags ? blog.tags.split(',') : ''
    let comment = ''  

    if ( user && blog && blog.numOfComments > 0 ) {
        for (let i = 0; i < blog.numOfComments; i++) {
            if ( blog.comments[i].user === user._id ) {                    
                comment = blog.comments[i].comment
            }
        }
    } 

    const toggleModal = (modalType) => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)  
        setIModalType(modalType)   
    }   
    const toggleLightbox = (imgIndex) => {   
        setIImageIndex(imgIndex)      
        setIsLightboxVisible(wasLightboxVisible => !wasLightboxVisible)   
    } 
    const slideTopAnimation = useSpring({     
        opacity: isLightboxVisible ? 1 : 0,
        transform: isLightboxVisible ? `translateY(0%)` : `translateY(-100%)`
    })

    const deleteCommentHandler = (id) => {
        dispatch(deleteComment(id, blog._id))        
    }   

    useEffect( () => {   

        dispatch(getBlogDetails(title))

        dispatch(getBlogs(1))      
        
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        } 
        if(commentError) { 
            alert.error(commentError)
            dispatch(clearErrors())
         } 
         if(success) {
            alert.success('Comment Posted Successfully')
            dispatch({ type: NEW_COMMENT_RESET })
            setIsModalVisible(false)
        }    
        
        if (deleteError) {
            alert.error(error)
            dispatch(clearErrors())
        }          
      
        if(isDeleted) {
            alert.success('Comment Deleted Successfully')            
            dispatch({ type: DELETE_COMMENT_RESET })
        } 

    }, [dispatch, alert, error, title, success, commentError, isDeleted, deleteError ])      

    return (

        <Fragment>  

            {loading ? <Loader /> : (

                <Fragment>

                    <MetaData title={blog.title} description={blog.description} />              
                    
                    <div className="bg-grey">

                        <div className="container"> 
                                
                            <div className="wrapper" style={{ paddingBottom: "5px" }}>
                                 
                                {blog.images && (
                                    <img src={blog.images[0].url} alt={blog.title} />
                                )}
                                <ul className="thumbnails" style={{ marginBottom: 0 }}>
                                {blog.images && blog.images.map((image, index) => (
                                    <li 
                                        key={image.public_id}
                                        onClick={() => toggleLightbox(index)}
                                    >
                                        <img 
                                            src={image.thumbUrl} 
                                            alt={blog.name} 
                                            className="object-fit"
                                        />
                                    </li>
                                ))}
                                </ul>   

                            </div>

                        </div>

                    </div>

                    <div className="container">

                        <div className="wrapper parent">

                            <aside>

                                <Sidebar blogs={blogs} />  

                            </aside>

                            <article>

                                <h1 style={{ marginBottom: "10px" }}>{blog.title}</h1> 

                                <div  style={{ marginBottom: "10px" }}>

                                    <small>Created on <b><FormattedDate iso={blog.createdAt} /></b> by <b>{blog.name}</b></small>

                                </div>
                                
                                <div  style={{ marginBottom: "10px" }}>
                                    <small><b>{blog.numOfComments}</b> Comments</small>
                                </div>

                                <div style={{ marginBottom: "20px" }}>
                                    {tags && tags.length > 0 && tags.map((tag, index) => (
                                        <small key={index}>
                                            <LocalOfferIcon color="primary" sx={{ fontSize: "12px" }} /> 
                                            {tag} &nbsp;
                                        </small>
                                    ))}
                                </div>

                                {blog.description && (
                                    <RichtextOutput text={blog.description} />
                                )}   

                                <div>                            

                                    {user ? 
                                        <Fragment>
                                            <IconButton onClick={() => {toggleModal(<Comment comment={comment} />)}}>
                                                <EditOutlinedIcon />
                                            </IconButton>
                                            Post Comment  
                                        </Fragment>      
                                    : 
                                        <Link to={`/login?redirect=blog/${title}`}>
                                            <IconButton>
                                                <LoginIcon />
                                            </IconButton>    
                                            Login to Post a Comment                                                      
                                        </Link>                                
                                    }                                 

                                </div> 

                                <Social />                              

                                <IconButton onClick={() => {toggleModal(<Contact />)}} color="primary">
                                    <EmailIcon />                                        
                                </IconButton>  

                            </article>

                        </div>

                    </div>    

                    {blog.comments && blog.comments.length > 0 && (  
                        <div className="bg-grey">                                    
                            <div className="container">
                                <div className="wrapper">                                    
                                    <ListComments 
                                        comments={blog.comments} 
                                        user={user} 
                                        toggleModal={toggleModal}
                                        deleteCommentHandler={deleteCommentHandler}
                                    />   
                                </div>
                            </div>
                        </div>                                                        
                    )}                                

                    {isLightboxVisible && (
                        <Lightbox 
                            product={blog} 
                            isLightboxVisible={isLightboxVisible} 
                            toggleLightbox={() => toggleLightbox(imageIndex)}  
                            slideTopAnimation={slideTopAnimation}
                            imgIndex={imageIndex}  
                        />
                    )}                        
                    
                    <Modal
                        isModalVisible={isModalVisible} 
                        onBackdropClick={toggleModal}   
                        content={modalType}
                    />  

                </Fragment>

            )}

        </Fragment>    

    )

}

export default BlogDetails
