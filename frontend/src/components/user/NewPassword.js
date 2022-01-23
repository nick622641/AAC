import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CircularProgress from '@mui/material/CircularProgress'

const NewPassword = () => {

    const navigate = useNavigate()
    const token = useParams().token
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')   
    const dispatch = useDispatch()
    const alert = useAlert()
    const {  error, success, loading } = useSelector(state => state.forgotPassword )
    const [ passwordVisible, setPasswordVisible ] = useState()
    const [ confirmPasswordVisible, setConfirmPasswordVisible ] = useState()

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible)
    }
    const toggleConfirmPassword = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible)
    }

    useEffect(() => {    
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {
            alert.success('Password Updated Successfully') 
            navigate('/login')          
        }
    }, [dispatch, navigate, alert, error, success])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('password', password)
        formData.set('confirmPassword', confirmPassword)
        dispatch(resetPassword(token, formData))
    }

    return (

        <Fragment>

            <MetaData title={'New Password Reset'} />

            <div className="container">

                <div className="wrapper">

                    <form className="user-form" onSubmit={submitHandler}>

                        <h1>New Password</h1>
                        
                        <label>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <IconButton className="eye" onClick={togglePassword}>
                                {passwordVisible ? (
                                    <VisibilityIcon fontSize="default" />
                                ):(
                                    <VisibilityOffIcon fontSize="default" />
                                )}
                            </IconButton>                            
                        </label>
                       
                        <label>
                            <input
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                placeholder="Confirm"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <IconButton className="eye" onClick={toggleConfirmPassword}>
                                {confirmPasswordVisible ? (
                                    <VisibilityIcon fontSize="default" />
                                ):(
                                    <VisibilityOffIcon fontSize="default" />
                                )}
                            </IconButton>                          
                        </label>

                        <br />
                        
                        <button
                            className="submit"
                            disabled={loading ? true : false}
                        >
                            {loading 
                                ? <CircularProgress sx={{ color: "var(--primary-color)" }} /> 
                                : 'Set Password'
                            }
                        </button>

                    </form>

                </div>

            </div>

        </Fragment>

    )

}

export default NewPassword
