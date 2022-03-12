import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { allUsers, deleteUser, clearErrors } from '../../../actions/userActions'
import { DELETE_USER_RESET } from '../../../constants/userConstants'
import MetaData from '../../layouts/MetaData'
import Loader from '../../layouts/Loader'
import Sidebar from '../Sidebar'
import Modal from '../../modals/Modal'
import Confirm from '../../modals/Confirm'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Avatar, Tooltip } from '@mui/material'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import CopyToClipboard from 'react-copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const UsersList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, users } = useSelector( state => state.allUsers )
    const { isDeleted             } = useSelector( state => state.user )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,              setId             ] = useState('')
    const [ fullscreen,      setFullscreen     ] = useState(false)

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
                    label: 'Preview',
                    field: 'url',
                    sort: 'disabled',
                    width: 70
                },   
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                    width: 150
                },             
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 100
                },                
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc',
                    width: 90
                }               
            ],
            rows: []
        }

        users.forEach( u => {
            data.rows.push({
                url: 
                    <Avatar
                        src={u.avatar.url} 
                        alt={u.name} 
                        sx={{ width: 50, height: 50 }}
                    />,
                actions: 
                <Fragment>  
                    <CopyToClipboard text={u._id}>
                        <IconButton onClick={() => alert.success('ID Copied')}>
                            <Tooltip title="Copy ID" arrow>
                                <ContentCopyIcon color="primary" />  
                            </Tooltip>
                        </IconButton>                    
                    </CopyToClipboard> 
                    <Link to={`/admin/user/${u._id}`}>
                        <Tooltip title="Update" arrow>
                            <IconButton>
                                <EditOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Link> 
                    <Tooltip title="Delete" arrow>
                        <IconButton 
                            onClick={() => {
                                setIsModalVisible(!isModalVisible)
                                setId(u._id)
                            }}
                        >
                            <DeleteOutlineIcon color="danger" />
                        </IconButton> 
                    </Tooltip>  
                </Fragment>,                
                name: u.name,
                role: <span style={{ textTransform: 'capitalize' }}>{u.role}</span> 
            })
        })

        return data
    }
    
    return (

        <Fragment>

            <MetaData title={'All Users'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>                     

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}> 

                        {loading ? <Loader /> : (

                            <Fragment>                            

                                <div className="user-form cart">

                                    <h1>All Users</h1>                                

                                    <MDBDataTableV5 
                                        data={setUsers()}   
                                        fullPagination   
                                        scrollX                                             
                                        searchTop
                                        searchBottom={false}  
                                    />                                

                                    <Link to="/admin/dashboard">
                                        <Fab 
                                            size="small" 
                                            className="close" 
                                            color="primary"
                                            sx={{ position: 'absolute', top: 10, right: 10 }}
                                        >
                                            <CloseIcon />
                                        </Fab>
                                    </Link>

                                    <Tooltip title="Expand" arrow>
                                        <IconButton 
                                            color="primary" 
                                            sx={{ position: 'absolute', top: 10, left: 10 }}
                                            onClick={() => setFullscreen(!fullscreen)}
                                    >
                                            <FitScreenIcon />
                                        </IconButton>
                                    </Tooltip>

                                </div>

                            </Fragment>

                        )}

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
