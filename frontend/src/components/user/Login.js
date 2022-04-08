import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { Button, FormControl, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'

const Login = () => {
        
    const location = useLocation()
    const alert    = useAlert()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const path = location.search  ? `/${location.search.split('=')[1]}` : '/me'  

    const { loading, isAuthenticated, error } = useSelector( state => state.auth )  

    const [ email,           setEmail           ] = useState('')
    const [ password,        setPassword        ] = useState('')    
    const [ passwordVisible, setPasswordVisible ] = useState()
    const [ redirect                            ] = useState(path)     

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
        
    }, [dispatch, navigate, alert, isAuthenticated, redirect, error])

    const submitHandler = (e) => {  
        e.preventDefault()      
        dispatch(login(email, password))
    }

    return (
        
        <Fragment>

            <MetaData title={'Login'} noIndex={true} />

            {loading ? <Loader /> : (                        

                <div className="container">

                    <div className="wrapper d-flex">

                        <form onSubmit={submitHandler} className="user-form">

                            <h1>Login</h1>                          

                            <FormControl fullWidth>
                                <TextField 
                                    label="Email" 
                                    type="email"
                                    value={email}
                                    variant="standard"
                                    onChange={(e) => setEmail(e.target.value)}
                                />                                 
                            </FormControl>                                       

                            <FormControl sx={{ mt: 2, mb: 4 }} variant="standard" fullWidth>
                                <InputLabel>Password</InputLabel>
                                <Input
                                    type={passwordVisible ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                            <Button 
                                variant="contained" 
                                type="submit" 
                                endIcon={<SendIcon />}
                                sx={{ width: '100%', mb: 4 }}
                                disabled={!email || !password ? true : false}
                            >
                                Login
                            </Button>

                            <div className="parent row">
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
