import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'
import { useNavigate, Link } from 'react-router-dom'
import { FormControl, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import MetaData from '../layouts/MetaData'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'
import ReCAPTCHA from 'react-google-recaptcha'
import Modal from '../modals/Modal'

const Register = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, isAuthenticated, error } = useSelector( state => state.auth )
   
    const [ user,            setUser            ] = useState({ name: '', email: '', password: '' })     
    const { name, email, password } = user    
    const [ avatar,          setAvatar          ] = useState('') 
    const [ avatarPreview,   setAvatarPreview   ] = useState('/images/default-avatar.jpg')     
    const [ passwordVisible, setPasswordVisible ] = useState()
    const [ captcha,         setCaptcha         ] = useState(false)
    const [ isVerified,      setIsVerified      ] = useState(false)

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible)
    }

    useEffect(() => {

        if(isAuthenticated) {
            navigate('/')            
        }
        if(error) {             
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, isAuthenticated, error, navigate])

    useEffect(() => {
        if ( name && email && password && avatar ) {
            setIsVerified(true)
        }
      }, [ name, email, password, avatar])

      useEffect(() => {
        if ( email ) {
            setIsVerified(true)
        }
      }, [ email ])

    const submitHandler = (e) => {
        e.preventDefault()         
        setCaptcha(true)                  
    }

    const handleChange = () => {             
        setCaptcha(false)
        const formData = new FormData()
        formData.set('name'    , name)
        formData.set('email'   , email)
        formData.set('password', password)
        formData.set('avatar'  , avatar)
        dispatch(register(formData))
    }

    const onChange = (e) => {
        if(e.target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }    

    return (       

        <Fragment>

            <MetaData title={'Register User'} noIndex={true} />

            <div className="container">

                <div className="wrapper d-flex">

                    <form onSubmit={submitHandler}  className="user-form">

                        <h1>Register</h1>

                        <table className="top-align">
                        <tbody>
                            <tr>
                                <td rowSpan="3">
                                    <label className="avatar">                            
                                        <input
                                            type="file"  
                                            className="hidden-input" 
                                            name="avatar"                            
                                            accept="images/*"
                                            onChange={onChange}                                                                                                                             
                                        />
                                        <Avatar 
                                            src={avatarPreview} 
                                            alt="Avatar Preview" 
                                            sx={{ width: 175, height: 175 }}
                                        />  
                                    </label>
                                </td>
                                <td>  
                                    <FormControl fullWidth>
                                        <TextField 
                                            label="Name" 
                                            name="name"
                                            value={name}
                                            variant="standard"
                                            onChange={onChange} 
                                        />                                 
                                    </FormControl> 
                                </td>
                            </tr>
                            <tr>
                                <td> 
                                    <FormControl fullWidth>
                                        <TextField 
                                            label="Email" 
                                            type="email"
                                            name="email"
                                            value={email}
                                            variant="standard"
                                            onChange={onChange} 
                                        />                                 
                                    </FormControl>  
                                </td>
                            </tr>
                            <tr>
                                <td>                                
                                    <FormControl sx={{ mb: 4 }} variant="standard" fullWidth>
                                        <InputLabel>Password</InputLabel>
                                        <Input
                                            type={passwordVisible ? 'text' : 'password'}
                                            value={password}
                                            name="password"
                                            onChange={onChange} 
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton onClick={togglePassword}>
                                                        {passwordVisible 
                                                            ? <Visibility fontSize="small" /> 
                                                            : <VisibilityOff fontSize="small" />
                                                        }
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </td>
                            </tr>
                        </tbody>
                        </table>    
                
                        <LoadingButton 
                            loading={loading}
                            loadingPosition="end"
                            variant="contained" 
                            onClick={submitHandler}
                            endIcon={<SendIcon />}
                            sx={{ mb: 4, width: '100%' }}
                            disabled={ !isVerified ? true : false }
                        >
                            Sign Up
                        </LoadingButton>

                        <div className="parent">
                            <small>Already signed up?</small>
                            <Link to="/login">Login</Link>
                        </div>

                        <Link to="/login">
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

            <Modal
                isModalVisible={captcha} 
                onBackdropClick={() => setCaptcha(false)}   
                content={ 
                    <ReCAPTCHA
                        sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
                        onChange={handleChange}
                    /> 
                }
            />             

        </Fragment>

    )
    
}

export default Register
