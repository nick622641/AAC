import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { newPainter, clearErrors } from '../../../actions/painterActions'
import { NEW_PAINTER_RESET } from '../../../constants/painterConstants'
import { FormControl, FormControlLabel, IconButton, TextField, Tooltip } from '@mui/material'
import MetaData from '../../layouts/MetaData'
import Sidebar from '../Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import Checkbox from '@mui/material/Checkbox'
import RichtextEditor from '../../layouts/richtext/RichtextEditor'
import RichtextPreview from '../../layouts/richtext/RichtextPreview'

const NewPainter = () => {    

    const alert    = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ title,         setTitle         ] = useState('')
    const [ slug,          setSlug          ] = useState('')
    const [ description,   setDescription   ] = useState('')      
    const [ style,         setStyle         ] = useState('')   
    const [ medium,        setMedium        ] = useState('')   
    const [ inspiration,   setInspiration   ] = useState('')   
    const [ visible,       setVisible       ] = useState(0)    
  
    const [ images,        setImages        ] = useState([])
    const [ imagesPreview, setImagesPreview ] = useState([])
    const [ fullscreen,    setFullscreen    ] = useState(false)
    
    const { loading, error, success } = useSelector( state => state.newPainter )
    const { user                    } = useSelector( state => state.auth )    

    useEffect(() => {  

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {            
            alert.success('Artist Bio Created Successfully')
            dispatch({ type: NEW_PAINTER_RESET })
            navigate('/admin/painters')
        }        
    }, [dispatch, navigate, alert, error, success])

    const submitHandler = (e) => {
        
        e.preventDefault()
        const formData = new FormData()
        formData.set('title', title)
        formData.set('slug', slug)
        formData.set('description', description)       
        formData.set('style', style)       
        formData.set('medium', medium)       
        formData.set('inspiration', inspiration)       
        formData.set('name', user.name)   
        formData.set('visible', visible)    

        images.forEach(image => {            
            formData.append('images', image)
        })
        dispatch(newPainter( urlencodeFormData(formData) ))
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

            <MetaData title={'New Artist Bio'} noIndex={true} />

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

                                    <div style={{ flexGrow: 1 }}>   

                                        <FormControl fullWidth>
                                            <TextField 
                                                label="Artist's Name" 
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
                                                label="Style" 
                                                value={style} 
                                                variant="standard"
                                                multiline
                                                onChange={(e) => setStyle(e.target.value)}
                                            />                                 
                                        </FormControl>     

                                        <FormControl fullWidth sx={{ mb: 1 }}>
                                            <TextField 
                                                label="Medium" 
                                                value={medium} 
                                                variant="standard"
                                                multiline
                                                onChange={(e) => setMedium(e.target.value)}
                                            />                                 
                                        </FormControl> 

                                        <FormControl fullWidth sx={{ mb: 1 }}>
                                            <TextField 
                                                label="Inspiration" 
                                                value={inspiration} 
                                                variant="standard"
                                                multiline
                                                onChange={(e) => setInspiration(e.target.value)}
                                            />                                 
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
                              
                                <h4>Content</h4>    

                                <RichtextEditor text={description} setText={setDescription} />  

                                <RichtextPreview text={description} />

                                <LoadingButton 
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained" 
                                    type="submit"
                                    endIcon={<SendIcon />}
                                    sx={{ mt: 4, width: '100%' }}
                                    disabled={!title || !description || !style || !medium || !inspiration || !images ? true : false}
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
            
        </Fragment>

    )

}

export default NewPainter
