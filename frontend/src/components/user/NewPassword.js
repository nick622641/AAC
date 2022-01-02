import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const NewPassword = () => {

    const navigate = useNavigate()
    const token = useParams().token
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')   
    const dispatch = useDispatch()
    const alert = useAlert()
    const {  error, success, loading } = useSelector(state => state.forgotPassword )
    const [ passwordVisible, setPasswordVisible ] = useState()

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible)
    }

    useEffect(() => {    
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {
            alert.success('Password updated successfully') 
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

                        <h2>New Password</h2>
                        
                        <label>
                            <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i 
                                className={passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'}
                                aria-hidden="true"
                                onClick={togglePassword}
                            ></i>
                        </label>
                       
                        <label>
                            <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Confirm"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <i 
                                className={passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'}
                                aria-hidden="true"
                                onClick={togglePassword}
                            ></i>
                        </label>

                        <button
                            className="submit"
                            disabled={loading ? true : false}
                        >
                            Set Password
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default NewPassword
