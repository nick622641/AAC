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
    const { loading, error, users } = useSelector( state => state.allUsers )
    const { isDeleted             } = useSelector( state => state.user )

    useEffect(() => {

        dispatch(allUsers())

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }  
        if(isDeleted) {
            alert.success('User Deleted Successfully')            
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, navigate, isDeleted, alert, error ])

    const deleteUserHandler = (id) => {
        if ( window.confirm("Are you Sure?") === true ) {
            dispatch(deleteUser(id))
        }       
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'disabled'
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
                    field: 'actions',
                    sort: 'disabled'
                  
                }
            ],
            rows: []
        }

        users.forEach( user => {
            data.rows.push({
                id: <small>{user._id}</small>,
                name: user.name,
                email: user.email, 
                role: user.role,                
                actions:                 
                    <Fragment>                        
                        <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil" />
                        </Link> 
                        &nbsp; &nbsp;
                        <i 
                            className="fa fa-trash-o"
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

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>                     

                    <article>

                        <Fragment>                            

                            <div className="user-form cart">

                                <h1>All Users</h1>

                                {loading ? <Loader /> : (

                                    <MDBDataTable
                                        className=" mdb-table"
                                        data={setUsers()}                                        
                                    />

                                )}

                                <Link to="/dashboard"><i className="fa fa-times" /></Link>

                            </div>

                        </Fragment>

                    </article>

                </div>

            </div>
            
        </Fragment>

    )
    
}

export default UsersList
