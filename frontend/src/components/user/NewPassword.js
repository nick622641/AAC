import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material'
import MetaData from '../layouts/MetaData'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'

const NewPassword = () => {

    const alert = useAlert()
    const token = useParams().token
    const dispatch = useDispatch()
    const navigate = useNavigate()  

    const { loading, error, success } = useSelector( state => state.forgotPassword ) 

    const [ password,               setPassword               ] = useState('')
    const [ confirmPassword,        setConfirmPassword        ] = useState('')      
    const [ passwordVisible,        setPasswordVisible        ] = useState()
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

            <MetaData title={'New Password Reset'} noIndex={true} />

            <div className="container">

                <div className="wrapper d-flex">

                    <form className="user-form" onSubmit={submitHandler}>

                        <h1>New Password</h1>
             
                        <FormControl sx={{ mb: 2 }} variant="standard" fullWidth>
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

                        <FormControl sx={{ mb: 4 }} variant="standard" fullWidth>
                            <InputLabel>Confirm</InputLabel>
                            <Input
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={toggleConfirmPassword}>
                                            {confirmPasswordVisible 
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
                            disabled={!password || !confirmPassword ? true : false}
                        >
                            Set Password
                        </LoadingButton> 

                    </form>

                </div>

            </div>

        </Fragment>

    )

}

export default NewPassword
