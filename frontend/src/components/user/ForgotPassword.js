import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'
import MetaData from '../layouts/MetaData'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

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
                <div className="wrapper">

                    <form className="user-form" onSubmit={submitHandler}>

                        <h1>Forgot Password</h1>
                       
                        <label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <br /><br />

                        <button
                            className="submit"
                            disabled={loading ? true : false}
                        >
                            {loading 
                                ? <CircularProgress sx={{ color: "var(--primary-color)" }} /> 
                                : 'Send Email'
                            }
                        </button>

                        <Link to="/login">                              
                            <Fab size="small" className="close" color="primary">
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
