import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getBlogDetails, getBlogs } from '../../actions/blogActions'
import { NEW_COMMENT_RESET } from '../../constants/blogConstants'
import { clearErrors } from '../../actions/userActions'
import { useSpring } from 'react-spring'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import Modal from '../modals/Modal'
import Contact from '../modals/Contact'
import Lightbox from '../product/Lightbox'
import Social from '../layouts/Social'
import parse from 'html-react-parser'
import IconButton from '@mui/material/IconButton'
import EmailIcon from '@mui/icons-material/Email'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LoginIcon from '@mui/icons-material/Login'
import Sidebar from './Sidebar'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import Comment from '../modals/Comment'
import ListComments from './ListComments'

const BlogDetails = () => {   

    const id       = useParams().id    
    const alert    = useAlert()
    const dispatch = useDispatch()

    const { error: commentError, success } = useSelector( state => state.newComment )
    const { blogs                } = useSelector( state => state.blogs )
    const { loading, blog, error } = useSelector( state => state.blogDetails )
    const { user                 } = useSelector( state => state.auth )   

    const [ modalType,         setIModalType        ] = useState()    
    const [ imageIndex,        setIImageIndex       ] = useState(0)   
    const [ isModalVisible,    setIsModalVisible    ] = useState(false)
    const [ isLightboxVisible, setIsLightboxVisible ] = useState(false)          

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
    useEffect( () => {   

        dispatch(getBlogDetails(id))

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
    }, [dispatch, alert, error, id, success, commentError ])      
    
    const date = new Date(blog.createdAt)
    const createdAt = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()

    const tags = blog.tags ? blog.tags.split(',') : ''

    return (

        <Fragment>  

            {loading ? <Loader /> : (

                <Fragment>

                    <MetaData title={blog.title} description={blog.description} />              
                    
                    <div className="bg-grey">

                        <div className="container"> 
                                
                            <div className="wrapper">
                                 
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

                                    <small>Created on <b>{createdAt}</b> by <b>{blog.name}</b></small>

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

                                <div style={{ marginBottom: "40px" }}>

                                    {blog.description && parse(blog.description)}  

                                </div>                               

                                {user ? 
                                    <Fragment>
                                        <IconButton onClick={() => {toggleModal(<Comment comment={comment} />)}}>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                        Post Comment  
                                    </Fragment>      
                                : 
                                    <Link to={`/login?redirect=blog/${id}`}>
                                        <IconButton>
                                            <LoginIcon />
                                        </IconButton>    
                                        Login to Post a Comment                                                      
                                    </Link>                                }                                 

                                <br />

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
