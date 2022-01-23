import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Avatar from '@mui/material/Avatar'

const Profile = () => {

    const { user, loading } = useSelector( state => state.auth )
    const date      = new Date(user.createdAt)
    const createdAt = date.getDate() + ' / ' + date.getMonth() + ' / ' + date.getFullYear()

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
                                            <Avatar 
                                                src={user.avatar.url} 
                                                alt={user.name} 
                                                sx={{ width: 175, height: 175 }}
                                            />
                                        </td>
                                        <td >
                                            <h6>Name</h6>
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
                                        <td>
                                            <Link to="/me/update"> 
                                                <IconButton>
                                                    <EditOutlinedIcon fontSize="small" />
                                                </IconButton>
                                                Update Profile
                                            </Link> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Link to="/password/update">
                                                <IconButton>
                                                    <EditOutlinedIcon fontSize="small" />
                                                </IconButton>
                                                Update Password
                                            </Link>
                                        </td>
                                        <td>                                           
                                            <Link to="/orders/me">
                                                <IconButton>
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                                My Orders
                                            </Link>                                           
                                        </td>
                                    </tr>                                   
                                </tbody>
                            </table>

                            <Link to="/">                              
                                <Fab size="small" className="close">
                                    <CloseIcon />
                                </Fab>
                            </Link>
                        
                        </div>                        
                    </div>
                </div>

            </Fragment>

        )}
            
        </Fragment>

    )

}

export default Profile
