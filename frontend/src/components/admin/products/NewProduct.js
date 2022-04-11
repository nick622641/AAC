import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { newProduct, clearErrors } from '../../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../../constants/productConstants'
import { getMedia, getOrientations, getArtists } from '../../../actions/categoryActions'
import { FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material'
import MetaData from '../../layouts/MetaData'
import Sidebar from '../Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import Checkbox from '@mui/material/Checkbox'
import RichtextEditor from '../../layouts/richtext/RichtextEditor'
import RichtextPreview from '../../layouts/richtext/RichtextPreview'

const NewProduct = () => {

    const alert    = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ name,          setName          ] = useState('')
    const [ slug,          setSlug          ] = useState('')
    const [ price,         setPrice         ] = useState()
    const [ width,         setWidth         ] = useState()
    const [ height,        setHeight        ] = useState()
    const [ depth,         setDepth         ] = useState(0)
    const [ description,   setDescription   ] = useState('')
    const [ artist,        setArtist        ] = useState('')
    const [ orientation,   setOrientation   ] = useState('')
    const [ medium,        setMedium        ] = useState('')
    const [ stock,         setStock         ] = useState('')
    const [ visible,       setVisible       ] = useState(0)
    const [ datePublished, setDatePublished ] = useState(Date.now())
    const [ images,        setImages        ] = useState([])
    const [ imagesPreview, setImagesPreview ] = useState([])
    const [ fullscreen,    setFullscreen    ] = useState(false)
    
    const { loading, error, success } = useSelector( state => state.newProduct )
    const { media                   } = useSelector( state => state.media )
    const { orientations            } = useSelector( state => state.orientations )
    const { artists                 } = useSelector( state => state.artists )

    useEffect(() => {
        
        dispatch(getMedia())        
        dispatch(getOrientations())        
        dispatch(getArtists())        

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {            
            alert.success('Product Created Successfully')
            dispatch({ type: NEW_PRODUCT_RESET })
            navigate('/admin/products')
        }
    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)
        formData.set('slug', slug)
        formData.set('price', price)
        formData.set('width', width)
        formData.set('height', height)
        formData.set('depth', depth)
        formData.set('description', description)
        formData.set('artist', artist)
        formData.set('orientation', orientation)
        formData.set('media', medium)
        formData.set('stock', stock)
        formData.set('visible', visible)
        formData.set('datePublished', datePublished)

        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(newProduct( urlencodeFormData(formData) ))
    }

    const onChange = (e) => {
        
        const files = Array.from(e.target.files)
        setImagesPreview([])
        setImages([])
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if(reader.readyState === 2) {
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

            <MetaData title={'New Product'} noIndex={true} />

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
                                        onChange={(e) => {
                                            setName(e.target.value)
                                            sanitizeInput(e.target.value)
                                        }} 
                                        sx={{ mb: 1 }}
                                    />                                 
                                </FormControl>

                                <div className="parent reverse">

                                    <div>

                                        <label>                                        
                                            <input
                                                type="file"   
                                                className="hidden-input"
                                                name="product_images"                            
                                                onChange={onChange}   
                                                multiple                              
                                            /> 
                                            <Avatar
                                                src={imagesPreview[0] ? imagesPreview[0] : '/images/default-product.jpg'} 
                                                alt='Avatar Preview' 
                                                sx={{ width: 150, height: 150, mr: 4, mb: 1 }}
                                            /> 
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

                                    <div>  
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Url Slug - (Read Only)"
                                                variant="filled"
                                                value={slug}
                                                disabled={true}
                                                InputProps={{
                                                    readOnly: true
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </FormControl>

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
                                
                                {imagesPreview.length > 0 && (
                                    <ul className="d-flex">
                                        {imagesPreview.map(img => (
                                            <li 
                                                key={img} 
                                                className="relative round background-cover" 
                                                style={{ marginRight: '10px', width: '40px', height: '40px', backgroundImage: `url(${img})` }}
                                            >                                           
                                            </li>
                                        ))} 
                                    </ul> 
                                )}                                     
                              
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

                                <h4>Description</h4> 

                                <RichtextEditor text={description} setText={setDescription} />   

                                <RichtextPreview text={description} />                           

                                <LoadingButton 
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained" 
                                    type="submit"
                                    endIcon={<SendIcon />}
                                    sx={{ mt: 4, width: '100%' }}
									disabled={!name || !price || !width || !height || !description || !artist || !orientation || !medium || !stock || !images ? true : false}
                                >
                                    Create
                                </LoadingButton>

                            </form>

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
            
        </Fragment>

    )

}

export default NewProduct
