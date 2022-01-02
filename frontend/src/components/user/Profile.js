import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'

const Profile = () => {

    const { user, loading } = useSelector( state => state.auth )
    const date = new Date(user.createdAt)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
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

                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img src={user.avatar.url} alt={user.name} /> 
                                            </td>
                                            <td style={{ verticalAlign: "top", paddingLeft: "40px" }}>
                                                <h5>Full Name</h5>
                                                <p>{user.name}</p>
                                                <br />
                                                <h5>Email Address</h5>
                                                <p>{user.email}</p>
                                                <br />
                                                <h5>Date Joined</h5>
                                                <p>{createdAt}</p>
                                            </td>
                                        </tr>
                                  
                                        <tr>
                                            <td>
                                                <Link to="/me/update">Update Profile</Link>
                                                <br />
                                                <br />
                                                <Link to="/password/update">Update Password</Link>
                                            </td>
                                            <td style={{ verticalAlign: "bottom", paddingLeft: "40px" }}>                                           
                                                <Link to="/orders/me">My Orders</Link>                                           
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
