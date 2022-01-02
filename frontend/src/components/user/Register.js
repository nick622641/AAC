import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    }) 
    const { name, email, password } = user    
    const [avatar, setAvatar] = useState('') 
    const [avatarPreview, setAvatarPreview] = useState('/images/default-avatar.jpg')   
    const dispatch = useDispatch()
    const alert = useAlert()
    const { isAuthenticated, error, loading } = useSelector(state => state.auth )
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
        formData.set('name', name)
        formData.set('email', email)
        formData.set('password', password)
        formData.set('avatar', avatar)
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

                        <h2>Register</h2>

                        <label className="avatar">                            
                            <input
                                type='file'   
                                name="avatar"                            
                                accept="images/*"
                                onChange={onChange}                                 
                            />                            
                            <img src={avatarPreview} alt="Avatar Preview"/>
                        </label>     

                        <label>
                            <input 
                                type="text" 
                                placeholder="Name"   
                                name="name"                      
                                value={name}
                                onChange={onChange}
                            />                
                        </label>

                        <label>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                name="email"                        
                                value={email}
                                onChange={onChange}
                            />                
                        </label>

                        <label>
                            <input 
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Password" 
                                name="password"
                                value={password}
                                onChange={onChange} 
                            />                
                            <i 
                                className={passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'}
                                aria-hidden="true"
                                onClick={togglePassword}
                            ></i>
                        </label>                          
                        <br /><br />
                        <button 
                            className="submit"
                            disabled={loading ? true : false}
                        >
                            Sign Up
                        </button>

                        <p className="parent">
                            <small>Already signed up?</small>
                            <Link to="/login">LOGIN</Link>
                        </p>
                            
                    </form>

                </div>

            </div>               

        </Fragment>
    )
}

export default Register
