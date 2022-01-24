import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrientations, deleteOrientation, clearErrors } from '../../actions/categoryActions'
import { DELETE_ORIENTATION_RESET } from '../../constants/categoryConstants'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'

const OrientationList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, orientations }  = useSelector( state => state.orientations )
    const { error: deleteError, isDeleted } = useSelector( state => state.orientation )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,              setId             ] = useState('')

    useEffect(() => {

        dispatch(getOrientations())

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        } 
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }      
        if(isDeleted) {
            alert.success('Orientation Deleted Successfully')            
            dispatch({ type: DELETE_ORIENTATION_RESET })
        }

    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const deleteCategoryHandler = (id) => {
        dispatch(deleteOrientation(id))
    }

    const setCategories = () => {
        const data = {
            columns: [                
                {
                    label: 'Orientation ID',
                    field: 'id',
                    sort: 'disabled',
                    width: 200
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
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
        orientations && orientations.forEach( orientation => {
            data.rows.push({                
                id: orientation._id,
                name: orientation.name,
                actions: 
                <Fragment>
                    <Link to={`/admin/orientation/${orientation._id}`}>
                        <IconButton>
                            <EditOutlinedIcon />
                        </IconButton>
                    </Link> 
                    <IconButton 
                        onClick={() => {
                            setIsModalVisible(!isModalVisible)
                            setId(orientation._id)
                        }}
                    >
                        <DeleteOutlineIcon color="danger" />
                    </IconButton>     
                </Fragment> 
            })
        })

        return data
    }    

    return (

        <Fragment>

            <MetaData title={'All Orientations'} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article className="relative">
                        
                        {loading ? <Loader /> : (

                            <div className="user-form cart">

                                <h1>Orientation Category</h1>

                                <p className="text-right">
                                    <Link to="/admin/orientation">
                                        Add
                                        <IconButton>
                                            <AddIcon />
                                        </IconButton>
                                    </Link>
                                </p>  

                                <MDBDataTableV5 
                                    data={setCategories()}   
                                    fullPagination   
                                    scrollX  
                                    scrollY   
                                    searchTop
                                    searchBottom={false}  
                                />

                                <Link to="/dashboard">
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
                        onConfirm={() => deleteCategoryHandler(id)} 
                        message="Delete Orientation"
                    />
                }
            />
            
        </Fragment>

    )

}

export default OrientationList
