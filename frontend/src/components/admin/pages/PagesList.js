import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getAdminPages, deletePage, clearErrors } from '../../../actions/pageActions'
import { DELETE_PAGE_RESET } from '../../../constants/pageConstants'
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

const PagesList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, pages } = useSelector( state => state.pages )
    const { loading: isLoading, error: deleteError, isDeleted } = useSelector( state => state.page  )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,              setId             ] = useState('')
    const [ fullscreen,      setFullscreen     ] = useState(false)

    useEffect(() => {

        dispatch(getAdminPages())

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if(isDeleted) {
            alert.success('Page Deleted Successfully')    
            dispatch({ type: DELETE_PAGE_RESET })            
        }
        
    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const deletePageHandler = (id) => {
        dispatch(deletePage(id))
    } 

    const setPages = () => {
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

        pages && pages.forEach( page => {     
            data.rows.push({
                url: <Link to={`/page/${page.slug}`}>
                        <Avatar
                            src={page.images[0].thumbUrl} 
                            alt={page.title} 
                            sx={{ width: 50, height: 50 }}
                        />          
                    </Link>,
                actions: <Fragment>
                        <CopyToClipboard text={page._id}>
                            <IconButton onClick={() => alert.success('ID Copied')}>
                                <Tooltip title="Copy ID" arrow>
                                    <ContentCopyIcon color="primary" />  
                                </Tooltip>
                            </IconButton>                     
                        </CopyToClipboard>    
                        <Link to={`/admin/page/${page._id}`}>
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
                                    setId(page._id)
                                }}
                            >
                                <DeleteOutlineIcon color="danger" />
                            </IconButton> 
                        </Tooltip>                     
                    </Fragment>,
                title: page.title   
               
            })
        })

        return data
    }   

    return (

        <Fragment>

            <MetaData title={'All Products'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>

                        <Sidebar />

                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>

                        {loading || isLoading ? <Loader /> : (

                            <Fragment>  

                                <div className="user-form">

                                    <h1>All Pages</h1>                                
                                
                                    <MDBDataTableV5 
                                        data={setPages()}   
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
                        onConfirm={() => deletePageHandler(id)} 
                        message="Delete Page"
                    />
                }
            />
            
        </Fragment>

    )

}

export default PagesList
