import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { allUsers, deleteUser, clearErrors } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const UsersList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, users } = useSelector( state => state.allUsers )
    const { isDeleted             } = useSelector( state => state.user )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,  setId ] = useState('')

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
        dispatch(deleteUser(id))
    }

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'disabled',
                    width: 200
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                    width: 100
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
                        <Link to={`/admin/user/${user._id}`}>
                            <IconButton>
                                <EditOutlinedIcon />
                            </IconButton>
                        </Link> 
                        <IconButton 
                            onClick={() => {
                                setIsModalVisible(!isModalVisible)
                                setId(user._id)
                            }}
                        >
                            <DeleteOutlineIcon sx={{ color: "red" }} />
                        </IconButton>                       
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

                                    <MDBDataTableV5 
                                        data={setUsers()}   
                                        fullPagination   
                                        scrollX  
                                        scrollY   
                                        searchTop
                                        searchBottom={false}  
                                    />

                                )}

                                <Link to="/dashboard">
                                    <Fab size="small" className="close">
                                        <CloseIcon />
                                    </Fab>
                                </Link>

                            </div>

                        </Fragment>

                    </article>

                </div>

            </div>

            <Modal
                isModalVisible={isModalVisible} 
                onBackdropClick={toggleModal}   
                content={
                    <Confirm 
                        onBackdropClick={toggleModal} 
                        onConfirm={() => deleteUserHandler(id)} 
                        message="Delete User"
                    />
                }
            />
            
        </Fragment>

    )
    
}

export default UsersList
