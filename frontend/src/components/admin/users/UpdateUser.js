import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserDetails, updateUser, clearErrors } from '../../../actions/userActions'
import { UPDATE_USER_RESET } from '../../../constants/userConstants'
import MetaData from '../../layouts/MetaData'
import Sidebar from '../Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import { FormControl, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import FitScreenIcon from '@mui/icons-material/FitScreen'

const UpdateUser = () => {    

    const alert = useAlert()
    const userId = useParams().id    
    const dispatch = useDispatch()
    const navigate = useNavigate()  
    const [ name,       setName       ] = useState('')
    const [ email,      setEmail      ] = useState('')
    const [ role,       setRole       ] = useState('')   
    const [ fullscreen, setFullscreen ] = useState(false)
    const { user                      } = useSelector(state => state.userDetails )
    const { loading, error, isUpdated } = useSelector(state => state.user )

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }
        if (error) { 
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success('User Updated Successfully')
            dispatch(getUserDetails(userId))
            navigate('/admin/users')            
            dispatch({ type: UPDATE_USER_RESET })
        }
    }, [dispatch, navigate, alert, error, isUpdated, user, userId])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)
        formData.set('email', email)
        formData.set('role', role)
        dispatch(updateUser(user._id, formData))
    }

    return (

        <Fragment>

            <MetaData title={'Update User'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>

                        <div className="user-form cart">

                            <h1>Update User</h1>

                            <form onSubmit={submitHandler}>

                                <FormControl fullWidth>
                                    <TextField 
                                        label="Name" 
                                        value={name}
                                        variant="standard"
                                        onChange={(e) => setName(e.target.value)} 
                                        sx={{ mb: 1 }}
                                    />                                 
                                </FormControl> 

                                <FormControl fullWidth>
                                    <TextField 
                                        type="email"
                                        label="Email" 
                                        value={email}
                                        variant="standard"
                                        onChange={(e) => setEmail(e.target.value)} 
                                        sx={{ mb: 1 }}
                                    />                                 
                                </FormControl> 

                                <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
                                    <InputLabel>Role</InputLabel>
                                    <Select 
                                        label="Role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}                                        
                                    >                                                                             
                                        <MenuItem value="user">User</MenuItem> 
                                        <MenuItem value="premium">Premium</MenuItem> 
                                        <MenuItem value="admin">Admin</MenuItem> 
                                    </Select>
                                </FormControl> 
             
                                <LoadingButton 
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained" 
                                    type="submit"
                                    endIcon={<SendIcon />}
                                    sx={{ mt: 4, width: '100%' }}
                                >
                                    Update
                                </LoadingButton>                               

                            </form>

                            <Link to="/admin/users">
                                <Fab 
                                    size="small" 
                                    className="close" 
                                    color="primary"
                                    sx={{ position: 'absolute', top: 10, right: 10 }}
                                >
                                    <CloseIcon />
                                </Fab>
                            </Link>

                            <Tooltip title="Expand">
                                <IconButton 
                                    color="primary" 
                                    sx={{ position: 'absolute', top: 10, left: 10 }}
                                    onClick={() => setFullscreen(!fullscreen)}
                            >
                                    <FitScreenIcon />
                                </IconButton>
                            </Tooltip>

                        </div>

                    </article>

                </div>

            </div>
            
        </Fragment>

    )

}

export default UpdateUser
