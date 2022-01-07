import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserDetails, updateUser, clearErrors } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'

const UpdateUser = () => {    

    const alert = useAlert()
    const userId = useParams().id    
    const dispatch = useDispatch()
    const navigate = useNavigate()  
    const [ name, setName    ] = useState('')
    const [ email, setEmail  ] = useState('')
    const [ role, setRole    ] = useState('')   
    const { user             } = useSelector(state => state.userDetails )
    const { error, isUpdated } = useSelector(state => state.user )

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
            alert.success('User updated successfully')
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

                <div className="wrapper parent dashboard">

                    <aside><Sidebar /></aside>            

                    <article>

                        <div className="user-form cart">

                            <h1>Update User</h1>

                            <form onSubmit={submitHandler}>

                                <table>
                                    <tbody>
                                        <tr>
                                            <th><h6>Name:</h6></th>
                                            <td>
                                                <input 
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><h6>Email:</h6></th>
                                            <td>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><h6>Role:</h6></th>
                                            <td>
                                                <select
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                >
                                                    <option value="user">user</option>
                                                    <option value="admin">admin</option>
                                                </select>
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>

                                
                             
                           

                                <button className="submit">Update</button>

                            </form>

                            <Link to="/admin/users"><i className="fa fa-times"></i></Link>

                        </div>

                    </article>

                </div>

            </div>
            
        </Fragment>

    )

}

export default UpdateUser
