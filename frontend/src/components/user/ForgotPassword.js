import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'
import { FormControl, TextField } from '@mui/material'
import MetaData from '../layouts/MetaData'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const [ email, setEmail ] = useState('')    
    const { loading, message, error } = useSelector( state => state.forgotPassword )

    useEffect(() => {    
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }
        if(message) {
            alert.success(message)    
        }
    }, [dispatch, alert, message, error])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('email', email)
        dispatch(forgotPassword(formData))
    }
    return (

        <Fragment>
            
            <MetaData title={'Forgot Password'} />
            
            <div className="container">
                
                <div className="wrapper d-flex">

                    <form className="user-form" onSubmit={submitHandler}>

                        <h1>Forgot Password</h1>                       
                    
                        <FormControl fullWidth>
                            <TextField 
                                label="Email" 
                                type="email"
                                value={email}
                                variant="standard"
                                onChange={(e) => setEmail(e.target.value)}
                                
                            />                                 
                        </FormControl> 
                       
                        <LoadingButton 
                            type="submit"
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"                            
                            endIcon={<SendIcon />}
                            sx={{ mt: 4, width: '100%' }}
                        >
                            Send Email
                        </LoadingButton>

                        <Link to="/login">                              
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

export default ForgotPassword
