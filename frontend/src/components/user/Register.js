import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'
import { useNavigate, Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'

const Register = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, isAuthenticated, error } = useSelector( state => state.auth )
   
    const [ user,           setUser             ] = useState({ name: '', email: '', password: '' })     
    const { name, email, password } = user    
    const [ avatar,          setAvatar          ] = useState('') 
    const [ avatarPreview,   setAvatarPreview   ] = useState('/images/default-avatar.jpg')     
    const [ passwordVisible, setPasswordVisible ] = useState()

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible)
    }

    useEffect(() => {

        if(isAuthenticated) {
            navigate('/')            
        }
        if(error) {             
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, isAuthenticated, error, navigate])

    const submitHandler = (e) => {        
        e.preventDefault()
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

            <MetaData title={'Register User'} />

            <div className="container">

                <div className="wrapper">

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
                                    <input 
                                        type="text" 
                                        placeholder="Name"   
                                        name="name"                      
                                        value={name}
                                        onChange={onChange}                                                                                
                                    /> 
                                </td>
                            </tr>
                            <tr>
                                <td>                                       
                                    <input 
                                        type="email" 
                                        placeholder="Email" 
                                        name="email"                        
                                        value={email}
                                        onChange={onChange}                                                                                
                                    />  
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        <input 
                                            type={passwordVisible ? 'text' : 'password'}
                                            placeholder="Password" 
                                            name="password"
                                            value={password}
                                            onChange={onChange}  
                                        /> 
                                        <IconButton className="eye" onClick={togglePassword}>
                                            {passwordVisible ? (
                                                <VisibilityIcon fontSize="small" />
                                            ):(
                                                <VisibilityOffIcon fontSize="small" />
                                            )}
                                        </IconButton>    
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                       
                        <button 
                            className="submit"
                            disabled={loading ? true : false}
                        >
                            {loading 
                                ? <CircularProgress color="primary" />
                                : 'Sign Up'
                            }
                        </button>

                        <br /><br />

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

        </Fragment>

    )
    
}

export default Register
