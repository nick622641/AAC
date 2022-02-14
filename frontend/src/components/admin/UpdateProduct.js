import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateProduct, getProductDetails, updateImages, deleteImage, clearErrors } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import { DELETE_IMAGE_RESET } from '../../constants/productConstants'
import { getMedia, getOrientations, getArtists } from '../../actions/categoryActions'
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'
import DragnDrop from './DragnDrop'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import RichtextEdittor from "../layouts/RichtextEdittor"

const UpdateProduct = () => {
    
    const [ name,            setName           ] = useState('')
    const [ price,           setPrice          ] = useState(0)
    const [ width,           setWidth          ] = useState(0)
    const [ height,          setHeight         ] = useState(0)
    const [ depth,           setDepth          ] = useState(0)
    const [ description,     setDescription    ] = useState('')
    const [ artist,          setArtist         ] = useState('')
    const [ orientation,     setOrientation    ] = useState('')
    const [ medium,          setMedium         ] = useState('')
    const [ stock,           setStock          ] = useState(0)
    const [ datePublished,   setDatePublished  ] = useState('')
    const [ images,          setImages         ] = useState([])   
    const [ oldImages,       setOldImages      ] = useState([])
    const [ imagesPreview,   setImagesPreview  ] = useState([])   
    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ imgIndex,        setImageIndex     ] = useState('')
    const [ imgId,           setImageId        ] = useState('')
    const [ init,            setInit           ] = useState(0)
    const [ final,           setFinal          ] = useState(0)
    const [ fullscreen,      setFullscreen     ] = useState(false)

    const alert     = useAlert()
    const productId = useParams().id   
    const navigate  = useNavigate()    
    const dispatch  = useDispatch()
    const { error, product                         } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated, error: deleteError, isDeleted } = useSelector(state => state.product)
    const { media                                  } = useSelector(state => state.media)
    const { orientations                           } = useSelector(state => state.orientations)
    const { artists                                } = useSelector(state => state.artists)

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    useEffect(() => {
        dispatch(getMedia()) 
        dispatch(getOrientations())    
        dispatch(getArtists())    

        if (product && product._id !== productId) {            
            dispatch(getProductDetails(productId))  
        } else {
            const date = new Date(product.datePublished)
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const createdAt = year + '-' + (month < 10 ? 0 : '') + month + '-' + (day < 10 ? 0 : '') + day
            setName(product.name)
            setPrice(product.price)
            setWidth(product.width)
            setHeight(product.height)
            setDepth(product.depth)
            setDescription(product.description)
            setArtist(product.artist)
            setOrientation(product.orientation)
            setMedium(product.media)
            setDatePublished(createdAt)
            setStock(product.stock)
            setOldImages(product.images)             
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
            alert.success('Artwork Updated Successfully')
            dispatch(getProductDetails(productId))  
            dispatch({ type: UPDATE_PRODUCT_RESET })     
            setImages([])           
        }
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if(isDeleted) {
            alert.success('Image Deleted Successfully') 
            dispatch(getProductDetails(productId))    
            dispatch({ type: DELETE_IMAGE_RESET })            
        }
    }, [dispatch, navigate, product, productId, alert, error, isUpdated, updateError, isDeleted, deleteError])

    const submitHandler = (e) => {

        setImagesPreview([])

        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)
        formData.set('price', price)
        formData.set('width', width)
        formData.set('height', height)
        formData.set('depth', depth)
        formData.set('description', description)
        formData.set('artist', artist)
        formData.set('orientation', orientation)
        formData.set('media', medium)
        formData.set('stock', stock)
        formData.set('datePublished', datePublished)

        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(updateProduct(product._id, formData))
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

    const deleteImageHandler = (id, imgIndex, imgId) => {
        dispatch(deleteImage(id, imgIndex, imgId))
    }  
    const updateImagesHandler = (id, initPos, finPos) => {
        dispatch(updateImages(id, initPos, finPos))
    }   

    return (

        <Fragment>

            <MetaData title={'Update Product'} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                    
                    </aside>            

                    <article className={fullscreen ? 'fullscreen' : ''}> 

                        <div className="user-form"> 

                            <form onSubmit={submitHandler} encType='multipart/form-data'>
                            
                                <FormControl fullWidth>
                                    <TextField 
                                        label="Artwork Title" 
                                        value={name}
                                        variant="standard"
                                        onChange={(e) => setName(e.target.value)} 
                                        sx={{ mb: 1 }}
                                    />                                 
                                </FormControl>                              

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
                                                alt={name}
                                                sx={{ width: 150, height: 150, mr: 4, mb: 1 }}
                                            />                                   
                                        )}   
                                        {imagesPreview[0] && (
                                            <Avatar
                                                src={imagesPreview[0]} 
                                                alt={name}
                                                sx={{ width: 150, height: 150, mr: 4, mb: 1 }}
                                            />                                           
                                        )}                                            
                                            
                                    </label>

                                    <div>

                                        <FormControl fullWidth sx={{ mb: 1 }}>
                                            <TextField 
                                                label="Stock" 
                                                InputProps={{ inputProps: { min: 0 } }}
                                                type="number"
                                                value={stock} 
                                                variant="standard"
                                                onChange={(e) => setStock(e.target.value)}
                                            />                                 
                                        </FormControl>

                                        <FormControl fullWidth sx={{ mb: 1 }}>
                                            <TextField 
                                                label="Price $ CAD" 
                                                InputProps={{ inputProps: { min: 0 } }}
                                                type="number"
                                                value={price} 
                                                variant="standard"
                                                onChange={(e) => setPrice(e.target.value)}
                                            />                                 
                                        </FormControl>                                               
                                    
                                        <FormControl fullWidth sx={{ mb: 1 }}>                                            
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>                                                        
                                                <DesktopDatePicker                                                    
                                                    label="Date published"
                                                    inputFormat="dd/MM/yyyy"
                                                    format="dd/MM/yyyy"
                                                    value={datePublished}
                                                    onChange={(newValue) => setDatePublished(newValue)} 
                                                    renderInput={(params) => <TextField variant="standard" {...params} />}
                                                />
                                            </LocalizationProvider>
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
                                    productId={productId}                                        
                                    init={init}
                                    final={final}
                                    oldImages={oldImages}
                                    imagesPreview={imagesPreview}
                                />  

                                <div>
                                    <h4>Dimensions <small>&bull; (cm)</small></h4>

                                    <div className="d-flex">
                            
                                        <FormControl fullWidth sx={{ mr: 2 }}>
                                            <TextField 
                                                label="Width" 
                                                InputProps={{ inputProps: { min: 0 } }}
                                                type="number"
                                                value={width} 
                                                variant="standard"
                                                onChange={(e) => setWidth(e.target.value)}
                                            />                                 
                                        </FormControl>
                                    
                                        <FormControl fullWidth sx={{ mr: 2 }}>
                                            <TextField 
                                                label="Height" 
                                                InputProps={{ inputProps: { min: 0 } }}
                                                type="number"
                                                value={height} 
                                                variant="standard"
                                                onChange={(e) => setHeight(e.target.value)}
                                            />                                 
                                        </FormControl>
                                                                        
                                        <FormControl fullWidth>
                                            <TextField 
                                                label="Depth" 
                                                InputProps={{ inputProps: { min: 0 } }}
                                                type="number"
                                                value={depth} 
                                                variant="standard"
                                                onChange={(e) => setDepth(e.target.value)}
                                            />                                 
                                        </FormControl>   

                                    </div>
                            
                                    <h4>Categories</h4>

                                    {artists.length > 0 && (
                                        <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
                                            <InputLabel>Artist</InputLabel>
                                            <Select 
                                                label="Artist"
                                                value={artist}
                                                onChange={(e) => setArtist(e.target.value)}                                             
                                            >
                                                {artists.map(a => (                                
                                                    <MenuItem key={a._id} value={a.name}>  
                                                        {a.name} 
                                                    </MenuItem>                                                
                                                ))} 
                                            </Select>
                                        </FormControl> 
                                    )}

                                    {orientations.length > 0 && (
                                        <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
                                            <InputLabel>Orientation</InputLabel>
                                            <Select 
                                                label="Orientation"
                                                value={orientation}
                                                onChange={(e) => setOrientation(e.target.value)}                                             
                                            >
                                                {orientations.map(o => (                                
                                                    <MenuItem key={o._id} value={o.name}>  
                                                        {o.name} 
                                                    </MenuItem>                                                
                                                ))} 
                                            </Select>
                                        </FormControl> 
                                    )}                                                                

                                    {media.length > 0 && (
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel>Media</InputLabel>
                                            <Select 
                                                label="Media"
                                                value={medium}
                                                onChange={(e) => setMedium(e.target.value)}                                             
                                            >
                                                {media.map(m => (                                
                                                    <MenuItem key={m._id} value={m.name}>  
                                                        {m.name} 
                                                    </MenuItem>                                                
                                                ))} 
                                            </Select>
                                        </FormControl>   
                                    )}   

                                </div>  

                                <h4>Description</h4> 

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
                        onConfirm={() => deleteImageHandler(productId, imgIndex, imgId)} 
                        message="Delete Image"
                    />
                }
            /> 

        </Fragment>
        
    )

}


export default UpdateProduct
