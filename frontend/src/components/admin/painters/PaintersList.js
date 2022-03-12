import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getAdminPainters, deletePainter, clearErrors } from '../../../actions/painterActions'
import { DELETE_PAINTER_RESET } from '../../../constants/painterConstants'
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
import { Tooltip } from '@mui/material';

const PaintersList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, painters } = useSelector( state => state.painters )
    const { loading: isLoading, error: deleteError, isDeleted } = useSelector( state => state.painter  )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,              setId             ] = useState('')
    const [ fullscreen,      setFullscreen     ] = useState(false)

    useEffect(() => {

        dispatch(getAdminPainters())

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if(isDeleted) {
            alert.success('Artist Bio Deleted Successfully')    
            dispatch({ type: DELETE_PAINTER_RESET })            
        }
        
    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const deletePainterHandler = (id) => {
        dispatch(deletePainter(id))
    } 

    const setPainters = () => {
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

        painters && painters.forEach( painter => {     
            data.rows.push({
                url: <Link to={`/painter/${painter.slug}`}>
                        <Avatar
                            src={painter.images[0].thumbUrl} 
                            alt={painter.title} 
                            sx={{ width: 50, height: 50 }}
                        />          
                    </Link>,
                actions: <Fragment>                        
                            <CopyToClipboard text={painter._id}>
                                <IconButton onClick={() => alert.success('ID Copied')}>
                                    <Tooltip title="Copy ID" arrow>
                                        <ContentCopyIcon color="primary" />  
                                    </Tooltip>
                                </IconButton>                     
                            </CopyToClipboard>  
                            <Link to={`/admin/painter/${painter._id}`}>
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
                                        setId(painter._id)
                                    }}
                                >
                                    <DeleteOutlineIcon color="danger" />
                                </IconButton>   
                            </Tooltip>                   
                        </Fragment>,
                title: painter.title   
               
            })
        })

        return data
    }   

    return (

        <Fragment>

            <MetaData title={'All Artist Bios'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>

                        <Sidebar />

                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>

                        {loading || isLoading ? <Loader /> : (

                            <Fragment>  

                                <div className="user-form">

                                    <h1>All Artist Bios</h1>                                
                                
                                    <MDBDataTableV5 
                                        data={setPainters()}   
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
                        onConfirm={() => deletePainterHandler(id)} 
                        message="Delete Artist Bio"
                    />
                }
            />
            
        </Fragment>

    )

}

export default PaintersList
