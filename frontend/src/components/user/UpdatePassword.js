import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import MetaData from '../layouts/MetaData'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CircularProgress from '@mui/material/CircularProgress'

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

                <div className="wrapper d-flex">

                    <form className="user-form" onSubmit={submitHandler}>

                        <h1>Update Password</h1>
                        
                        <label>
                            <input
                                type={oldPasswordVisible ? 'text' : 'password'}
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}                                
                            />
                            <IconButton className="eye" onClick={toggleOldPassword}>
                                {oldPasswordVisible ? (
                                    <VisibilityIcon fontSize="small" />
                                ):(
                                    <VisibilityOffIcon fontSize="small" />
                                )}
                            </IconButton>  
                        </label> 
                        <br />                     
                        <label>
                            <input
                                type={newPasswordVisible ? 'text' : 'password'}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <IconButton className="eye" onClick={toggleNewPassword}>
                                {newPasswordVisible ? (
                                    <VisibilityIcon fontSize="small" />
                                ):(
                                    <VisibilityOffIcon fontSize="small" />
                                )}
                            </IconButton>                             
                        </label>
                        <br /><br />
                        <button 
                            className="submit" 
                            disabled={loading ? true : false}
                        >
                            {loading 
                                ? <CircularProgress color="primary" />
                                : 'Update Password'
                            }
                        </button>

                        <Link to="/me">                              
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

export default UpdatePassword
