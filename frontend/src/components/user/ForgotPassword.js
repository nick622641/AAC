import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'
import MetaData from '../layouts/MetaData'

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
                <div className="wrapper stage">

                    <form className="user-form" onSubmit={submitHandler}>

                        <h1>Forgot Password</h1>
                       
                        <label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>

                        <br /><br />

                        <button
                            className="submit"
                            disabled={loading ? true : false}
                        >
                            {loading ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw"/> : 'Send Email'}
                        </button>

                        <Link to="/login"><i className="fa fa-times"/></Link>

                    </form>

                </div>
            </div>

        </Fragment>

    )

}

export default ForgotPassword
