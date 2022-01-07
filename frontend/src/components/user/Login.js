import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'
import { useNavigate, Link, useLocation } from 'react-router-dom'

const Login = () => {
        
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const alert = useAlert()
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')    
    const [ passwordVisible, setPasswordVisible ] = useState()
    const { loading, isAuthenticated, error } = useSelector( state => state.auth )
    const redirect = location.search  ? `/${location.search.split('=')[1]}` : '/'  

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

            {loading ? <Loader /> : (
                
                <Fragment>

                    <MetaData title={'Login'} />

                    <div className="container">
                        <div className="wrapper stage">

                            <form onSubmit={submitHandler} className="user-form">

                                <h1>Login</h1>

                                <label>
                                    <input 
                                        type="email" 
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />                
                                </label>

                                <br />

                                <label>
                                    <input 
                                        type={passwordVisible ? 'text' : 'password'} 
                                        placeholder="Password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />                
                                    <i                         
                                        className={passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'}
                                        onClick={togglePassword}
                                    />
                                </label>  

                                <br /><br />                              

                                <button className="submit">Login</button>

                                <br />

                                <p className="parent">
                                    <Link to="/password/forgot">Forgot Password?</Link>                               
                                    <Link to="/register">New User?</Link>
                               </p>

                            </form>

                        </div>

                    </div>
                   
                </Fragment>

            )}

        </Fragment>

    )

}

export default Login
