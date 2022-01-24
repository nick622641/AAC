import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserDetails, updateUser, clearErrors } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

const UpdateUser = () => {    

    const alert = useAlert()
    const userId = useParams().id    
    const dispatch = useDispatch()
    const navigate = useNavigate()  
    const [ name, setName    ] = useState('')
    const [ email, setEmail  ] = useState('')
    const [ role, setRole    ] = useState('')   
    const { user             } = useSelector(state => state.userDetails )
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

            <MetaData title={'Update User'} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article>

                        <div className="user-form cart">

                            <h1>Update User</h1>

                            <form onSubmit={submitHandler}>

                                <table>
                                    <tbody>
                                        <tr>
                                            <th className="text-right">Name</th>
                                            <td>
                                                <input 
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">Email</th>
                                            <td>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">Role</th>
                                            <td>
                                                <select
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                                
                                <br />

                                <button
                                    className="submit"
                                    disabled={loading ? true : false}
                                >
                                    {loading 
                                        ? <CircularProgress color="primary" />
                                        : 'Update'
                                    }
                                </button>

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

                        </div>

                    </article>

                </div>

            </div>
            
        </Fragment>

    )

}

export default UpdateUser
