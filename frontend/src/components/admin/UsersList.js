import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { allUsers, deleteUser, clearErrors } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'

const UsersList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, users } = useSelector(state => state.allUsers)
    const { isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers())
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }  
        if(isDeleted) {
            alert.success('User deleted successfully')            
            dispatch({ type: DELETE_USER_RESET })
            navigate('/admin/users')
        }
    }, [dispatch, navigate, isDeleted, alert, error ])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                  
                }
            ],
            rows: []
        }

        users.forEach( user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email, 
                role: user.role,                
                actions:                 
                    <Fragment>
                        
                        <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link> 

                        <i 
                            className="fa fa-trash"
                            onClick={() => deleteUserHandler(user._id)}
                        />

                    </Fragment> 
            })
        })

        return data;
    }
    
    return (

        <Fragment>

            <MetaData title={'All Users'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside><Sidebar /></aside>                     

                    <article>

                        <Fragment>

                            <h1>All Users</h1>

                            <div className="user-form cart mdb-table">

                                {loading ? <Loader /> : (
                                    <MDBDataTable
                                        data={setUsers()}
                                        bordered
                                        striped
                                        hover    
                                    />
                                )}
                                <Link to="/dashboard"><i className="fa fa-times"></i></Link>

                            </div>

                        </Fragment>

                    </article>

                </div>

            </div>
            
        </Fragment>

    )
}

export default UsersList
