import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getAdminStaff, deleteStaff, clearErrors } from '../../../actions/staffActions'
import { DELETE_STAFF_RESET } from '../../../constants/staffConstants'
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
import Avatar from '@mui/material/Avatar'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Tooltip } from '@mui/material'

const StaffList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, staffMembers } = useSelector( state => state.staffMembers )
    const { loading: isLoading, error: deleteError, isDeleted } = useSelector( state => state.staff  )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,              setId             ] = useState('')
    const [ fullscreen,      setFullscreen     ] = useState(false)

    useEffect(() => {

        dispatch(getAdminStaff())

        if(error) {
            return alert.error(error)            
        }
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if(isDeleted) {
            alert.success('Staff member Deleted Successfully')    
            dispatch({ type: DELETE_STAFF_RESET })            
        }
        
    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const deleteStaffHandler = (id) => {
        dispatch(deleteStaff(id))
    } 

    const setStaff = () => {
        const data = {
            columns: [
                {
                    label: 'Preview',
                    field: 'url',
                    sort: 'disabled',
                    width: 75
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                    width: 150                
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc',
                    width: 120
                }                            
            ],
            rows: []
        }

        staffMembers && staffMembers.forEach( staffMember => {     
            data.rows.push({
                url: <Link to={`/staff/${staffMember.slug}`}>
                        <Avatar
                            src={staffMember.avatar.url} 
                            alt={staffMember.title} 
                            sx={{ width: 50, height: 50 }}
                        />          
                    </Link>,
                actions: <Fragment>                        
                            <CopyToClipboard text={staffMember._id}>
                                <IconButton onClick={() => alert.success('ID Copied')}>
                                    <Tooltip title="Copy ID" arrow>
                                        <ContentCopyIcon color="primary" />  
                                    </Tooltip>
                                </IconButton>                     
                            </CopyToClipboard>  
                            <Link to={`/admin/staff/${staffMember._id}`}>
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
                                        setId(staffMember._id)
                                    }}
                                >
                                    <DeleteOutlineIcon color="danger" />
                                </IconButton>   
                            </Tooltip>                   
                        </Fragment>,
                title: staffMember.title   
               
            })
        })

        return data
    }   

    return (

        <Fragment>

            <MetaData title={'All Staff Members'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>

                        <Sidebar />

                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>

                        {loading || isLoading ? <Loader /> : (

                            <Fragment>  

                                <div className="user-form">

                                    <h1>All Staff Members</h1>                                
                                
                                    <MDBDataTableV5 
                                        data={setStaff()}   
                                        fullPagination   
                                        scrollX  
                                        searchTop
                                        searchBottom={false}  
                                    />                                 

                                    <Link to="/admin/dashboard">
                                        <Fab 
                                            size="small" 
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
                        onConfirm={() => deleteStaffHandler(id)} 
                        message="Delete Artist Bio"
                    />
                }
            />
            
        </Fragment>

    )

}

export default StaffList
