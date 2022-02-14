import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateBlog, getBlogDetails, updateImages, deleteImage, clearErrors } from '../../actions/blogActions'
import { UPDATE_BLOG_RESET } from '../../constants/blogConstants'
import { DELETE_IMAGE_RESET } from '../../constants/blogConstants'
import { FormControl, IconButton, TextField } from '@mui/material'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import DragnDrop from './DragnDrop'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import RichtextEdittor from "../layouts/RichtextEdittor"

const UpdateBlog = () => {

    const alert     = useAlert()
    const blogId    = useParams().id   
    const navigate  = useNavigate()    
    const dispatch  = useDispatch()

    const { error, blog } = useSelector( state => state.blogDetails )
    const { loading, isUpdated, error: updateError, error: deleteError, isDeleted } = useSelector( state => state.blog )  
    
    const [ title,           setTitle          ] = useState('')
    const [ tags,            setTags           ] = useState('')   
    const [ description,     setDescription    ] = useState('')   
    const [ images,          setImages         ] = useState([])   
    const [ oldImages,       setOldImages      ] = useState([])
    const [ imagesPreview,   setImagesPreview  ] = useState([])    

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ imgIndex,        setImageIndex     ] = useState('')
    const [ imgId,           setImageId        ] = useState('')
    const [ init,            setInit           ] = useState(0)
    const [ final,           setFinal          ] = useState(0)
    const [ fullscreen,      setFullscreen     ] = useState(false)

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const deleteImageHandler = (id, imgIndex, imgId) => {
        dispatch(deleteImage(id, imgIndex, imgId))
    }  
    const updateImagesHandler = (id, initPos, finPos) => {
        dispatch(updateImages(id, initPos, finPos))
    }  

    useEffect(() => {       

        if (blog && blog._id !== blogId) {    

            dispatch(getBlogDetails(blogId))             

        } else {
            
            setTitle(blog.title)
            setTags(blog.tags)            
            setDescription(blog.description)          
            setOldImages(blog.images)        
        }

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if(updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }
        
        if(isUpdated) {            
            alert.success('Blog Updated Successfully')
            dispatch(getBlogDetails(blogId))  
            dispatch({ type: UPDATE_BLOG_RESET })    
            setImages([])       
        } 
        
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted) {
            alert.success('Image Deleted Successfully') 
            dispatch(getBlogDetails(blogId))    
            dispatch({ type: DELETE_IMAGE_RESET })            
        }
        
    }, [dispatch, navigate, blog, blogId, alert, error, isUpdated, updateError, deleteError, isDeleted ])

    const submitHandler = (e) => {

        setImagesPreview([])

        e.preventDefault()
        const formData = new FormData()
        formData.set('title', title)
        formData.set('tags', tags)       
        formData.set('description', description)       

        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(updateBlog(blog._id, formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)
        setImagesPreview([])
        setImages([])

        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    } 

    return (

        <Fragment>

            <MetaData title={'Update Blog'} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                    
                    </aside>            

                    <article className={fullscreen ? 'fullscreen' : ''}> 

                        <div className="user-form"> 

                            <form onSubmit={submitHandler} encType='multipart/form-data'>  

                                <div className="parent reverse">
                                    
                                    <label>                                    
                                        <input
                                            type='file'   
                                            className="hidden-input"
                                            name="product_images"                            
                                            onChange={onChange}   
                                            multiple                              
                                        />   
                                                                
                                        {oldImages[0] && !imagesPreview[0]  && (
                                            <Avatar
                                                src={oldImages[0].thumbUrl} 
                                                alt={title}
                                                sx={{ width: 150, height: 150, mr: 4, mb: 1 }}
                                            />                                   
                                        )}   
                                        {imagesPreview[0] && (
                                            <Avatar
                                                src={imagesPreview[0]} 
                                                alt={title}
                                                sx={{ width: 150, height: 150, mr: 4, mb: 1 }}
                                            />                                           
                                        )}                                            
                                            
                                    </label>

                                    <div style={{ flexGrow: 1 }}>

                                        <FormControl fullWidth>
                                            <TextField 
                                                label="Blog Title" 
                                                value={title}
                                                variant="standard"
                                                onChange={(e) => setTitle(e.target.value)} 
                                                sx={{ mb: 1 }}
                                            />                                 
                                        </FormControl>     

                                        <FormControl fullWidth sx={{ mb: 1 }}>
                                            <TextField 
                                                label="Tags (seperate with commas)" 
                                                value={tags} 
                                                variant="standard"
                                                multiline
                                                onChange={(e) => setTags(e.target.value)}
                                            />                                 
                                        </FormControl>    

                                    </div>                           

                                </div>  

                                <DragnDrop 
                                    setIsModalVisible={setIsModalVisible}
                                    setImageIndex={setImageIndex}
                                    setImageId={setImageId}
                                    setInit={setInit}
                                    setFinal={setFinal}
                                    updateImagesHandler={updateImagesHandler}
                                    productId={blogId}                                        
                                    init={init}
                                    final={final}
                                    oldImages={oldImages}
                                    imagesPreview={imagesPreview}
                                />  

                                <h4>Content</h4> 

                                {description && (  
                                    <RichtextEdittor text={description} setText={setDescription} /> 
                                )}                                                           
                    
                                <LoadingButton 
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained" 
                                    type="submit"
                                    endIcon={<SendIcon />}
                                    sx={{ mt: 4, width: '100%' }}
                                >
                                    Update
                                </LoadingButton>

                            </form>                            

                            <Fab 
                                size="small" 
                                className="close" 
                                color="primary"
                                onClick={() => navigate(-1)} 
                                sx={{ position: 'absolute', top: 10, right: 10 }}
                            >
                                <CloseIcon />
                            </Fab>

                            <IconButton 
                                color="primary" 
                                sx={{ position: 'absolute', top: 10, left: 10 }}
                                onClick={() => setFullscreen(!fullscreen)}
                            >
                                <FitScreenIcon />
                            </IconButton>

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
                        onConfirm={() => deleteImageHandler(blogId, imgIndex, imgId)} 
                        message="Delete Image"
                    />
                }
            />         

        </Fragment>
        
    )

}


export default UpdateBlog
