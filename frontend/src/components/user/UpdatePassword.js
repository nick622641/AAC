import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import MetaData from '../layouts/MetaData'

const UpdatePassword = () => {    
    
    const dispatch = useDispatch()      
    const navigate = useNavigate()     
    const alert = useAlert() 
    const [ newPassword, setNewPassword ] = useState('') 
    const [ oldPassword, setOldPassword ] = useState('')       
    const [ oldPasswordVisible, setOldPasswordVisible ] = useState(false)
    const [ newPasswordVisible, setNewPasswordVisible ] = useState(false)
    const { loading, isUpdated, error } = useSelector( state => state.user )

    const toggleOldPassword = () => {
        setOldPasswordVisible(!oldPasswordVisible)
    }
    const toggleNewPassword = () => {
        setNewPasswordVisible(!newPasswordVisible)
    }

    useEffect(() => {    
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }
        if(isUpdated) {
            alert.success('Password Updated Successfully')
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
        formData.set('password', newPassword)
        dispatch(updatePassword(formData))
    }

    return (

        <Fragment>

            <MetaData title={'Update Password'} />

            <div className="container">
                <div className="wrapper stage">

                    <form className="user-form" onSubmit={submitHandler}>

                        <h1>Update Password</h1>
                        
                        <label>
                            <input
                                type={oldPasswordVisible ? 'text' : 'password'}
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                            <i 
                                className={oldPasswordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'}
                                onClick={toggleOldPassword}
                            />
                        </label> 
                        <br />                     
                        <label>
                            <input
                                type={newPasswordVisible ? 'text' : 'password'}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                minLength="6"
                                required
                            />
                            <i 
                                className={newPasswordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'}
                                onClick={toggleNewPassword}
                            />
                        </label>
                        <br /><br />
                        <button 
                            className="submit" 
                            disabled={loading ? true : false}
                        >
                            {loading ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw"/> : 'Update Password'}
                        </button>

                        <Link to="/me"><i className="fa fa-times"/></Link>

                    </form>

                </div>
            </div>

        </Fragment>

    )

}

export default UpdatePassword
