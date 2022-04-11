import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateCourse, getAdminCourseDetails } from '../../../actions/courseActions'
import { UPDATE_COURSE_RESET } from '../../../constants/courseConstants'
import { FormControl, FormControlLabel, IconButton, TextField, Tooltip } from '@mui/material'
import MetaData from '../../layouts/MetaData'
import Sidebar from '../Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import Checkbox from '@mui/material/Checkbox'
import RichtextEditor from '../../layouts/richtext/RichtextEditor'
import RichtextPreview from '../../layouts/richtext/RichtextPreview'

const UpdateCourse = () => {

    const alert     = useAlert()
    const navigate  = useNavigate()    
    const dispatch  = useDispatch()

    const courseId   = useParams().id

    const { error, course } = useSelector( state => state.adminCourseDetails )
    const { loading, isUpdated, error: updateError } = useSelector( state => state.course )  
    
    const [ title,           setTitle          ] = useState('')
    const [ slug,            setSlug           ] = useState('')
    const [ description,     setDescription    ] = useState('')  
    const [ author,          setAuthor         ] = useState('')   
    const [ video,           setVideo          ] = useState('')   
    const [ visible,         setVisible        ] = useState(1) 
    const [ fullscreen,      setFullscreen     ] = useState(false)  

    useEffect(() => {       

        if (course && course._id !== courseId  ) {              

            dispatch(getAdminCourseDetails(courseId  ))             

        } else {
            
            setTitle(course.title)
            setSlug(course.slug)
            setDescription(course.description)  
            setAuthor(course.author)    
            setVideo(course.video)  
            setVisible(course.visible)     
        }

        if(error) {
            return alert.error(error)
        }

        if(updateError) {
            return alert.error(updateError)
        }
        
        if(isUpdated) {            
            alert.success('Course Updated Successfully')
            dispatch(getAdminCourseDetails( courseId  ))  
            dispatch({ type: UPDATE_COURSE_RESET })    
        }
        
    }, [dispatch, navigate, course, courseId  , alert, error, isUpdated, updateError ])

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('title', title)
        formData.set('slug', slug)
        formData.set('description', description)   
        formData.set('author', author)       
        formData.set('video', embedVideoCallcack(video))       
        formData.set('visible', visible)  

        dispatch(updateCourse(course._id, formData ))
    }
    
    const sanitizeInput = (value) => {
        value = value.replace(/[^\w -]/ig, '')
        value = value.replace(/ /ig, '-')
        setSlug(value.toLowerCase())
    }

    const embedVideoCallcack = ( url ) => {
        if ( url.indexOf( 'youtube' ) >= 0 )  {
            url = url.replace( '/watch/'  , '/embed/' )
            url = url.replace( 'youtu.be/', 'youtube.com/embed/' )
            url = url.replace( 'watch?v=' , 'embed/' )               
        }    
        return url     
    }

    return (

        <Fragment>

            <MetaData title={'Update Course'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                    
                    </aside>            

                    <article className={fullscreen ? 'fullscreen' : ''}> 

                        <div className="user-form"> 

                            <form onSubmit={submitHandler} encType='multipart/form-data'>  

                                <div className="parent reverse">

                                    <div style={{ marginRight: "40px" }}>   

                                        {video !== '' && video.indexOf( 'youtube' ) >= 0 && (

                                            <iframe                                           
                                                src={embedVideoCallcack(video)} 
                                                title={course.title}
                                                style={{ 
                                                    pointerEvents: "none",
                                                    borderRadius: "50%",
                                                    width: "200px",
                                                    height: "200px"                              
                                                }}                                            
                                            />

                                        )}                                    

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
                                                label="Course Name" 
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
                                                label="Author" 
                                                value={author} 
                                                variant="standard"
                                                multiline
                                                onChange={(e) => setAuthor(e.target.value)}
                                            />                                 
                                        </FormControl>     

                                        <FormControl fullWidth sx={{ mb: 1 }}>
                                            <TextField 
                                                label="Video" 
                                                value={video} 
                                                variant="standard"
                                                multiline
                                                onChange={(e) => setVideo(e.target.value)}
                                            />                                 
                                        </FormControl>                                  

                                    </div>                           

                                </div>                                                        

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
                                    disabled={!title || !description || !author || !video ? true : false}
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

        </Fragment>
        
    )

}

export default UpdateCourse
