import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateFriend, getAdminFriendDetails } from '../../../actions/friendActions'
import { UPDATE_FRIEND_RESET } from '../../../constants/friendConstants'
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

const UpdateFriend = () => {

    const alert     = useAlert()
    const navigate  = useNavigate()    
    const dispatch  = useDispatch()

    const friendId   = useParams().id

    const { error, friend } = useSelector( state => state.adminFriendDetails )
    const { loading, isUpdated, error: updateError } = useSelector( state => state.friend )  
    
    const [ title,           setTitle          ] = useState('')
    const [ slug,            setSlug           ] = useState('')
    const [ description,     setDescription    ] = useState('')  
    const [ background,      setBackground     ] = useState('')   
    const [ profession,      setProfession     ] = useState('')   
    const [ interests,       setInterests      ] = useState('') 
    const [ visible,         setVisible        ] = useState(1) 
    const [ avatar,          setAvatar         ] = useState('') 
    const [ avatarPreview,   setAvatarPreview  ] = useState('')    

    const [ fullscreen,      setFullscreen     ] = useState(false)  

    useEffect(() => {       

        if (friend && friend._id !== friendId  ) {              

            dispatch(getAdminFriendDetails(friendId  ))             

        } else {
            
            setTitle(friend.title)
            setSlug(friend.slug)
            setDescription(friend.description)  
            setBackground(friend.background)    
            setProfession(friend.profession) 
            setInterests(friend.interests)  
            setAvatarPreview(friend.avatar.url)  
            setVisible(friend.visible)     
        }

        if(error) {
            return alert.error(error)
        }

        if(updateError) {
            return alert.error(updateError)
        }
        
        if(isUpdated) {            
            alert.success('Friend Updated Successfully')
            dispatch(getAdminFriendDetails( friendId  ))  
            dispatch({ type: UPDATE_FRIEND_RESET })    
        }
        
    }, [dispatch, navigate, friend, friendId  , alert, error, isUpdated, updateError ])

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('title', title)
        formData.set('slug', slug)
        formData.set('description', description)   
        formData.set('background', background)       
        formData.set('profession', profession)       
        formData.set('interests', interests)   
        formData.set('visible', visible)  
        formData.set('avatar', avatar)

        dispatch(updateFriend(friend._id, urlencodeFormData(formData) ))
    }

    const onAvatarChange = (e) => {        
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
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

            <MetaData title={'Update Friend'} noIndex={true} />

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
                                            <Avatar 
                                                src={avatarPreview} 
                                                alt='Avatar Preview' 
                                                sx={{ width: 75, height: 75 }}
                                            />                                 
                                            <input
                                                type='file' 
                                                className="hidden-input"  
                                                onChange={onAvatarChange} 
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
                                                label="Friend's Name" 
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
                                                label="Background" 
                                                value={background} 
                                                variant="standard"
                                                multiline
                                                onChange={(e) => setBackground(e.target.value)}
                                            />                                 
                                        </FormControl>     

                                        <FormControl fullWidth sx={{ mb: 1 }}>
                                            <TextField 
                                                label="Profession" 
                                                value={profession} 
                                                variant="standard"
                                                multiline
                                                onChange={(e) => setProfession(e.target.value)}
                                            />                                 
                                        </FormControl> 

                                        <FormControl fullWidth sx={{ mb: 1 }}>
                                            <TextField 
                                                label="Interests" 
                                                value={interests} 
                                                variant="standard"
                                                multiline
                                                onChange={(e) => setInterests(e.target.value)}
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

export default UpdateFriend
