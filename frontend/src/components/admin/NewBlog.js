import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { newBlog, clearErrors } from '../../actions/blogActions'
import { NEW_BLOG_RESET } from '../../constants/blogConstants'
import { FormControl, IconButton, TextField } from '@mui/material'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const NewBlog = () => {    

    const alert    = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ title,         setTitle         ] = useState('')
    const [ tags,          setTags          ] = useState('')   
    const [ description,   setDescription   ] = useState('')
  
    const [ images,        setImages        ] = useState([])
    const [ imagesPreview, setImagesPreview ] = useState([])
    const [ fullscreen,    setFullscreen    ] = useState(false)
    
    const { loading, error, success } = useSelector( state => state.newBlog )
    const { user                    } = useSelector( state => state.auth )   
    
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    )
    const handleEditorChange = (state) => {
        setEditorState(state)
        setDescription(draftToHtml(convertToRaw(state.getCurrentContent())))
    }

    useEffect(() => {  

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {            
            alert.success('Blog Created Successfully')
            dispatch({ type: NEW_BLOG_RESET })
            navigate('/admin/blogs')
        }
    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        
        e.preventDefault()
        const formData = new FormData()
        formData.set('title', title)
        formData.set('tags', tags)       
        formData.set('description', description)       
        formData.set('name', user.name)       

        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(newBlog(formData))
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

    return (

        <Fragment>

            <MetaData title={'New Blog'} />

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
                                                label="Tags" 
                                                value={tags} 
                                                variant="standard"
                                                multiline
                                                onChange={(e) => setTags(e.target.value)}
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

                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={handleEditorChange}  
                                    editorClassName="editor-area"   
                                    toolbarClassName="richtext-editor"                                     
                                    placeholder="Please enter your content here"
                                    stripPastedStyles
                                    spellCheck
                                    toolbar={{
                                        image: {                                    
                                             alt: {
                                                    present: true,
                                                    mandatory: true
                                                  }
                                        }
                                    }}        
                                />   

                                <LoadingButton 
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained" 
                                    type="submit"
                                    endIcon={<SendIcon />}
                                    sx={{ mt: 4, width: '100%' }}
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
            
        </Fragment>

    )

}

export default NewBlog
