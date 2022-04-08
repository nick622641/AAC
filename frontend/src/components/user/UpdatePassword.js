import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material'
import MetaData from '../layouts/MetaData'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'

const UpdatePassword = () => {    

    const alert = useAlert() 
    
    const dispatch = useDispatch()      
    const navigate = useNavigate()     
    
    const { loading, isUpdated, error } = useSelector( state => state.user )

    const [ newPassword,        setNewPassword        ] = useState('') 
    const [ oldPassword,        setOldPassword        ] = useState('')       
    const [ oldPasswordVisible, setOldPasswordVisible ] = useState(false)
    const [ newPasswordVisible, setNewPasswordVisible ] = useState(false)   

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

            <MetaData title={'Update Password'} noIndex={true} />

            <div className="container">

                <div className="wrapper d-flex">

                    <form className="user-form" onSubmit={submitHandler}>

                        <h1>Update Password</h1>                        
                       
                        <FormControl sx={{ mb: 2 }} variant="standard" fullWidth>
                            <InputLabel>Old Password</InputLabel>
                            <Input
                                type={oldPasswordVisible ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={toggleOldPassword}>
                                            {oldPasswordVisible 
                                                ? <Visibility fontSize="small" /> 
                                                : <VisibilityOff fontSize="small" />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <FormControl sx={{ mb: 4 }} variant="standard" fullWidth>
                            <InputLabel>New Password</InputLabel>
                            <Input
                                type={newPasswordVisible ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={toggleNewPassword}>
                                            {newPasswordVisible 
                                                ? <Visibility fontSize="small" /> 
                                                : <VisibilityOff fontSize="small" />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <LoadingButton 
                            type="submit"
                            loading={loading}
                            loadingPosition="end"
                            variant="contained" 
                            endIcon={<SendIcon />}
                            sx={{ width: '100%' }}
                            disabled={ !newPassword || !oldPassword ? true : false }
                        >
                            Update Password
                        </LoadingButton>  

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
