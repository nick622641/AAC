import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const alert = useAlert()
    const { error, message, loading } = useSelector(state => state.forgotPassword )

    useEffect(() => {    
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }
        if(message) {
            alert.success(message)          
        }
    }, [dispatch, alert, error, message])

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
                        <h2>Forgot Password</h2>
                       
                        <label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <button
                            className="submit"
                            disabled={loading ? true : false}
                        >
                            Send Email
                        </button>

                        <Link to="/login"><i className="fa fa-times"></i></Link>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgotPassword
