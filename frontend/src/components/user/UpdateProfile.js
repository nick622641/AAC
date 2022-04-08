import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { FormControl, TextField } from '@mui/material'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import MetaData from '../layouts/MetaData'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'

const UpdateProfile = () => {

    const alert = useAlert()
    
    const dispatch = useDispatch()
    const navigate = useNavigate()   

    const { user                      } = useSelector( state => state.auth )
    const { loading, isUpdated, error } = useSelector( state => state.user )

    const [ name,          setName          ] = useState('')
    const [ email,         setEmail         ] = useState('')
    const [ avatar,        setAvatar        ] = useState('')
    const [ avatarPreview, setAvatarPreview ] = useState('/images/default-avatar.jpg')   
    
    useEffect(() => {
        if(user) {
            setName(user.name)  
            setEmail(user.email)   
            setAvatarPreview(user.avatar.url)  
        }
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }
        if(isUpdated) {
            alert.success('User Updated Successfully')
            dispatch(loadUser())
            navigate('/me')              
            dispatch({ type: UPDATE_PROFILE_RESET })
        }
    }, [dispatch, navigate, user, alert, isUpdated, error])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)
        formData.set('email', email)
        formData.set('avatar', avatar)
        dispatch(updateProfile(formData))
    }

    const onChange = (e) => { 
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return (

        <Fragment>

            <MetaData title={'Update Profile'} noIndex={true} />

            <div className="container">

                <div className="wrapper d-flex">  

                    <form className="user-form" onSubmit={submitHandler} encType='multipart/form-data'>
                      
                        <h1>Update Profile</h1>

                        <div className="parent">
                            <div className="d-flex align-items-center justify-content-center">
                                <label>  
                                    <Avatar 
                                        src={avatarPreview} 
                                        alt='Avatar Preview' 
                                        sx={{ width: 175, height: 175 }}
                                    />                                 
                                    <input
                                        type='file' 
                                        className="hidden-input"  
                                        onChange={onChange} 
                                    />         
                                </label>
                            </div>

                            <div className="spacer" />
                            
                            <div>
                                <FormControl fullWidth>
                                    <TextField 
                                        label="Name" 
                                        value={name}
                                        variant="standard"
                                        onChange={(e) => setName(e.target.value)}
                                        sx={{ mb: 2 }}
                                    />                                 
                                </FormControl> 

                                <FormControl fullWidth>
                                    <TextField 
                                        label="Email" 
                                        type="email"
                                        value={email}
                                        variant="standard"
                                        onChange={(e) => setEmail(e.target.value)}                                                
                                    />                                 
                                </FormControl>

                            </div>
                        </div> 

                        <LoadingButton 
                            loading={loading}
                            loadingPosition="end"
                            variant="contained" 
                            onClick={submitHandler}
                            endIcon={<SendIcon />}
                            sx={{ mt: 4, width: '100%' }}
                            disabled={!name || !email ? true : false}
                        >
                            Update
                        </LoadingButton>

                        <Link to="/me">                              
                            <Fab 
                                size="small" 
                                className="close" 
                                color="primary"
                                sx={{ position: 'absolute', top: 10, right: 10 }}
                            >
                                <CloseIcon />
                            </Fab>
                        </Link>

                    </form>

                </div>

            </div>

        </Fragment>

    )

}

export default UpdateProfile
