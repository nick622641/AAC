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
import ReCAPTCHA from 'react-google-recaptcha'
import Modal from '../modals/Modal'

const ForgotPassword = () => {

    const { loading, message, error } = useSelector( state => state.forgotPassword )

    const dispatch = useDispatch()
    const alert = useAlert()
    const [ email,      setEmail           ] = useState('')    
    const [ captcha,    setCaptcha         ] = useState(false)

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
        setCaptcha(true)                  
    }

    const handleChange = (value) => {        
        const formData = new FormData()
        formData.set('email', email)
        formData.set('key', value)   
        dispatch(forgotPassword(formData))
        setCaptcha(false)  
    }

    return (

        <Fragment>
            
            <MetaData title={'Forgot Password'} noIndex={true} />
            
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
                            disabled={ !email ? true : false }
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

            <Modal
                isModalVisible={captcha} 
                onBackdropClick={() => setCaptcha(false)}   
                content={ 
                    <ReCAPTCHA
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        onChange={handleChange}
                    /> 
                }
            />

        </Fragment>

    )

}

export default ForgotPassword
