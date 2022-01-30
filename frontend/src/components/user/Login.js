import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const Login = () => {
        
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const alert    = useAlert()
    const path = location.search  ? `/${location.search.split('=')[1]}` : '/'  
    const [ email,           setEmail           ] = useState('')
    const [ password,        setPassword        ] = useState('')    
    const [ passwordVisible, setPasswordVisible ] = useState()
    const [ redirect                            ] = useState(path)
    const { loading, isAuthenticated, error } = useSelector( state => state.auth )     

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible)
    }    
   
    useEffect(() => {

        if(isAuthenticated) {
            navigate(redirect)   
        }
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, isAuthenticated, error, redirect, navigate])

    const submitHandler = (e) => {        
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        
        <Fragment>

            <MetaData title={'Login'} />

            {loading ? <Loader /> : (                        

                <div className="container">

                    <div className="wrapper d-flex">

                        <form onSubmit={submitHandler} className="user-form">

                            <h1>Login</h1>

                            <label>
                                <input 
                                    type="email" 
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />                
                            </label>

                            <br />

                            <label>
                                <input 
                                    type={passwordVisible ? 'text' : 'password'} 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                /> 
                                <IconButton className="eye" onClick={togglePassword}>
                                    {passwordVisible ? (
                                        <VisibilityIcon fontSize="small" />
                                    ):(
                                        <VisibilityOffIcon fontSize="small" />
                                    )}
                                </IconButton>                
                        
                            </label>  

                            <br /><br />                              

                            <button className="submit">Login</button>

                            <br /><br />

                            <div className="parent">
                                <Link to="/password/forgot">Forgot Password?</Link>                               
                                <Link to="/register">New User?</Link>
                            </div>

                        </form>

                    </div>

                </div>                   

            )}

        </Fragment>

    )

}

export default Login
