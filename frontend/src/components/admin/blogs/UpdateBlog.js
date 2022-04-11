import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateBlog, getAdminBlogDetails, updateImages, deleteImage, clearErrors } from '../../../actions/blogActions'
import { UPDATE_BLOG_RESET } from '../../../constants/blogConstants'
import { DELETE_IMAGE_RESET } from '../../../constants/blogConstants'
import { FormControl, FormControlLabel, IconButton, TextField, Tooltip } from '@mui/material'
import MetaData from '../../layouts/MetaData'
import Sidebar from '../Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import DragnDrop from '../DragnDrop'
import Modal from '../../modals/Modal'
import Confirm from '../../modals/Confirm'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import Checkbox from '@mui/material/Checkbox'
import RichtextEditor from '../../layouts/richtext/RichtextEditor'
import RichtextPreview from '../../layouts/richtext/RichtextPreview'

const UpdateBlog = () => {

    const alert     = useAlert()
    const navigate  = useNavigate()    
    const dispatch  = useDispatch()

    const blogId = useParams().id

    const { error, blog } = useSelector( state => state.adminBlogDetails )
    const { loading, isUpdated, error: updateError, error: deleteError, isDeleted } = useSelector( state => state.blog )  
    
    const [ title,           setTitle          ] = useState('')
    const [ slug,            setSlug           ] = useState('')
    const [ tags,            setTags           ] = useState('')   
    const [ description,     setDescription    ] = useState('')  
    const [ visible,         setVisible        ] = useState(1) 
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

            dispatch(getAdminBlogDetails(blogId))             

        } else {
            
            setTitle(blog.title)
            setSlug(blog.slug)
            setTags(blog.tags)            
            setDescription(blog.description)          
            setOldImages(blog.images)   
            setVisible(blog.visible)     
        }

        if(error) {
            return alert.error(error)
        }

        if(updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }
        
        if(isUpdated) {            
            alert.success('Blog Updated Successfully')
            dispatch(getAdminBlogDetails(blogId))  
            dispatch({ type: UPDATE_BLOG_RESET })    
            setImages([])       
        } 
        
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted) {
            alert.success('Image Deleted Successfully') 
            dispatch(getAdminBlogDetails(blogId))    
            dispatch({ type: DELETE_IMAGE_RESET })            
        }
        
    }, [dispatch, navigate, blog, blogId, alert, error, isUpdated, updateError, deleteError, isDeleted ])

    const submitHandler = (e) => {

        setImagesPreview([])

        e.preventDefault()
        const formData = new FormData()
        formData.set('title', title)
        formData.set('slug', slug)
        formData.set('tags', tags)       
        formData.set('description', description)    
        formData.set('visible', visible)  

        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(updateBlog(blog._id, urlencodeFormData(formData) ))
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

    const urlencodeFormData = ( formData ) => {
        const params = new URLSearchParams()
        for( let pair of formData.entries() ) {
            typeof pair[1]=='string' && params.append( pair[0], pair[1] )
        }
        return params.toString()
    }
    
    const sanitizeInput = (value) => {
        value = value.replace(/[^\w -]/ig, '')
        value = value.replace(/ /ig, '-')
        setSlug(value.toLowerCase())
    }

    return (

        <Fragment>

            <MetaData title={'Update Blog'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                    
                    </aside>            

                    <article className={fullscreen ? 'fullscreen' : ''}> 

                        <div className="user-form"> 

                            <form onSubmit={submitHandler} encType='multipart/form-data'>  

                                <div className="parent reverse">

                                    <div>
                                    
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

                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    size="small"
                                                    value={visible}
                                                    onChange={(e) => setVisible(e.target.checked ? 1 : 0 )}
                                                    checked={visible === 1 ? true : false}
                                                />
                                            } 
                                            label={visible === 1 ? 'Published' : 'Draft'} 
                                        /> 

                                    </div>

                                    <div style={{ flexGrow: 1 }}>

                                        <FormControl fullWidth>
                                            <TextField 
                                                label="Blog Title" 
                                                value={title}
                                                variant="standard"
                                                onChange={(e) => {
                                                    setTitle(e.target.value)
                                                    sanitizeInput(e.target.value)
                                                }} 
                                                sx={{ mb: 1 }}
                                            />                                 
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <TextField
                                                label="Url Slug - (Read Only)"
                                                variant="filled"
                                                value={slug}
                                                disabled={true}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
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
                                    productId={blog._id}                                        
                                    init={init}
                                    final={final}
                                    oldImages={oldImages}
                                    imagesPreview={imagesPreview}
                                />                                  

                                <h4>Content</h4> 

                                {description !== '' && (  

                                    <Fragment>

                                        <RichtextEditor text={description} setText={setDescription} /> 

                                        <RichtextPreview text={description} />

                                    </Fragment>
                                )}                                                                                    
                    
                                <LoadingButton 
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained" 
                                    type="submit"
                                    endIcon={<SendIcon />}
                                    sx={{ mt: 4, width: '100%' }}
                                    disabled={!title || !tags || !description || !images ? true : false}
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

                    </article>

                </div>

            </div>      

            <Modal
                isModalVisible={isModalVisible} 
                onBackdropClick={toggleModal}   
                content={
                    <Confirm 
                        onBackdropClick={toggleModal} 
                        onConfirm={() => deleteImageHandler(blog._id, imgIndex, imgId)} 
                        message="Delete Image"
                    />
                }
            />         

        </Fragment>
        
    )

}


export default UpdateBlog
