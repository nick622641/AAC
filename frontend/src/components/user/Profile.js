import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'

const Profile = () => {

    const { user, loading } = useSelector( state => state.auth )
    const date  = new Date(user.createdAt)
    const day   = date.getDate()
    const month = date.getMonth() + 1
    const year  = date.getFullYear()
    const createdAt = day + ' / ' + month + ' / ' + year

    return (

        <Fragment>

        {loading ? <Loader /> : (

            <Fragment>

                <MetaData title={'My Profile'} />

                <div className="container">
                    <div className="wrapper">
                        <div className="user-form">

                            <h1>My Profile</h1>

                            <table className="middle-align">
                            <tbody>
                                <tr>
                                    <td rowSpan="3">
                                        <img src={user.avatar.url} alt={user.name} /> 
                                    </td>
                                    <td >
                                        <h6>Username</h6>
                                        <p>{user.name}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6>Email</h6>
                                        <p>{user.email}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6>Date Joined</h6>
                                        <p>{createdAt}</p>
                                    </td>
                                </tr>                                  
                                <tr>
                                    <td colSpan="2">
                                        <Link to="/me/update">                                            
                                            <small>
                                                <i className="fa fa-pencil" /> 
                                                &nbsp; Update Profile
                                            </small>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link to="/password/update">
                                            <small>
                                                <i className="fa fa-pencil" /> 
                                                &nbsp; Update Password
                                            </small>
                                        </Link>
                                    </td>
                                    <td>                                           
                                        <Link to="/orders/me">
                                            <small>
                                                <i className="fa fa-eye" /> 
                                                &nbsp; My Orders
                                            </small>
                                        </Link>                                           
                                    </td>
                                </tr>                                   
                            </tbody>
                            </table>
                        
                        </div>
                    </div>
                </div>
            </Fragment>
        )}
            
        </Fragment>

    )

}

export default Profile
