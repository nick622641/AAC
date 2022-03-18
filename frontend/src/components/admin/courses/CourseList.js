import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getAdminCourses, deleteCourse, clearErrors } from '../../../actions/courseActions'
import { DELETE_COURSE_RESET } from '../../../constants/courseConstants'
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
import FitScreenIcon from '@mui/icons-material/FitScreen'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Tooltip } from '@mui/material'

const CourseList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, courses } = useSelector( state => state.courses )
    const { loading: isLoading, error: deleteError, isDeleted } = useSelector( state => state.course  )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,              setId             ] = useState('')
    const [ fullscreen,      setFullscreen     ] = useState(false)

    useEffect(() => {

        dispatch(getAdminCourses())

        if(error) {
            return alert.error(error)            
        }
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if(isDeleted) {
            alert.success('Course Deleted Successfully')    
            dispatch({ type: DELETE_COURSE_RESET })            
        }
        
    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const deleteCourseHandler = (id) => {
        dispatch(deleteCourse(id))
    } 

    const setCourses = () => {
        const data = {
            columns: [
                {
                    label: 'Preview',
                    field: 'url',
                    sort: 'disabled',
                    width: 120
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
                },
                {
                    label: 'Author',
                    field: 'author',
                    sort: 'asc',
                    width: 120
                }                                                        
            ],
            rows: []
        }

        courses && courses.forEach( course => {     
            data.rows.push({
                url: <Link to={`/course/${course.slug}`}>
                        <div>
                            <iframe                             
                                src={course.video} 
                                title={course.title}
                                style={{ 
                                    pointerEvents: "none",
                                    borderRadius: "50%",
                                    width: "100px",
                                    height: "100px"                              
                                }}                    
                            />
                        </div>
                    </Link>,
                actions: <Fragment>                        
                            <CopyToClipboard text={course._id}>
                                <IconButton onClick={() => alert.success('ID Copied')}>
                                    <Tooltip title="Copy ID" arrow>
                                        <ContentCopyIcon color="primary" />  
                                    </Tooltip>
                                </IconButton>                     
                            </CopyToClipboard>  
                            <Link to={`/admin/course/${course._id}`}>
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
                                        setId(course._id)
                                    }}
                                >
                                    <DeleteOutlineIcon color="danger" />
                                </IconButton>   
                            </Tooltip>                   
                        </Fragment>,
                title: course.title,
                author: course.author     
               
            })
        })

        return data
    }   

    return (

        <Fragment>

            <MetaData title={'All Courses'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>

                        <Sidebar />

                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>

                        {loading || isLoading ? <Loader /> : (

                            <Fragment>  

                                <div className="user-form">

                                    <h1>All Courses</h1>                                
                                
                                    <MDBDataTableV5 
                                        data={setCourses()}   
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
                        onConfirm={() => deleteCourseHandler(id)} 
                        message="Delete Course"
                    />
                }
            />
            
        </Fragment>

    )

}

export default CourseList
