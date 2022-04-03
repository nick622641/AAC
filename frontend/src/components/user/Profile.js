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
import FormattedDate from '../layouts/FormattedDate'

const Profile = () => {

    const { user, loading } = useSelector( state => state.auth )   
    
    return (

        <Fragment>

            <MetaData title={'My Profile'} noIndex={true} />

                {loading ? <Loader /> : (                

                    <div className="container">

                        <div className="wrapper d-flex">

                            <div className="user-form">

                                <h1>My Profile</h1>

                                <div className="parent">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <Avatar 
                                            src={user.avatar.url} 
                                            alt={user.name} 
                                            sx={{ width: 175, height: 175 }}
                                        />
                                    </div>

                                    <div className="spacer" />

                                    <div>
                                        <h6>Name</h6>
                                        <p>{user.name}</p>

                                        <br />

                                        <h6>Email</h6>
                                        <p>{user.email}</p>

                                        <br />

                                        <h6>Date Joined</h6>
                                        <p><FormattedDate iso={user.createdAt} format="date" /></p>

                                    </div>
                                </div> 

                                <div className="spacer" />

                                <div className="parent">
                                    <div>
                                        <Link to="/me/update"> 
                                            <IconButton>
                                                <EditOutlinedIcon fontSize="small" />
                                            </IconButton>
                                            Update Profile
                                        </Link>

                                        <br />

                                        <Link to="/password/update">
                                            <IconButton>
                                                <EditOutlinedIcon fontSize="small" />
                                            </IconButton>
                                            Update Password
                                        </Link>
                                    </div>                                    

                                    <div>
                                        <Link to="/orders/me">
                                            <IconButton>
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                            My Orders
                                        </Link> 
                                    </div>
                                </div>  

                                <Link to="/">                              
                                    <Fab 
                                        size="small" 
                                        className="close" 
                                        color="primary"
                                        sx={{ position: 'absolute', top: 10, right: 10 }}
                                    >
                                        <CloseIcon />
                                    </Fab>
                                </Link>
                            
                            </div>                        
                        </div>
                    </div>

            )}
            
        </Fragment>

    )

}

export default Profile
