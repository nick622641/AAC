import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import { useNavigate, Link } from 'react-router-dom'

const UpdatePassword = () => {

    const navigate = useNavigate()
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')    
    const dispatch = useDispatch()
    const alert = useAlert()
    const {  error, isUpdated, loading } = useSelector(state => state.user )
    const [ passwordVisible, setPasswordVisible ] = useState()

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible)
    }

    useEffect(() => {    
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }
        if(isUpdated) {
            alert.success('Password updated successfully')
            navigate('/me')              
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, alert, error, navigate, isUpdated])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('oldPassword', oldPassword)
        formData.set('password', password)
        dispatch(updatePassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Update Password'} />
            <div className="container">
                <div className="wrapper">

                    <form className="user-form" onSubmit={submitHandler}>
                        <h2>Update Password</h2>
                        
                        <label>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <i 
                                className={passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'}
                                aria-hidden="true"
                                onClick={togglePassword}
                            ></i>
                        </label>  
                    
                        <label>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            Update Password
                        </button>

                        <Link to="/me"><i className="fa fa-times"></i></Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword
