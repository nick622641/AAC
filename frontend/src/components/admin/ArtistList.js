import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getArtists, deleteArtist, clearErrors } from '../../actions/categoryActions'
import { DELETE_ARTIST_RESET } from '../../constants/categoryConstants'
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

const ArtistList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, artists       } = useSelector( state => state.artists )
    const { error: deleteError, isDeleted } = useSelector( state => state.artist  )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,              setId             ] = useState('')

    useEffect(() => {

        dispatch(getArtists())

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        } 
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }      
        if(isDeleted) {
            alert.success('Artist Deleted Successfully')            
            dispatch({ type: DELETE_ARTIST_RESET })
        }

    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const deleteCategoryHandler = (id) => {
        dispatch(deleteArtist(id))
    }

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const setCategories = () => {
        const data = {
            columns: [                
                {
                    label: 'Artist ID',
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
                    sort: 'disabled'  ,
                    width: 100                
                }
            ],
            rows: []
        }      
        artists && artists.forEach( artist => {
            data.rows.push({                
                id: artist._id,
                name: artist.name,
                actions: 
                    <Fragment>
                        <Link to={`/admin/artist/${artist._id}`}>
                            <IconButton>
                                <EditOutlinedIcon />
                            </IconButton>
                        </Link> 
                        <IconButton 
                            onClick={() => {
                                setIsModalVisible(!isModalVisible)
                                setId(artist._id)
                            }}
                        >
                            <DeleteOutlineIcon sx={{ color: "red" }} />
                        </IconButton>   
                    </Fragment> 
            })
        }) 

        return data

    }    

    return (

        <Fragment>

            <MetaData title={'All Artists'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article>                        
                        
                        {loading ? <Loader /> : (

                            <div className="user-form cart">

                                <h1>Artist Category</h1>

                                <p className="text-right">
                                    <Link to="/admin/artist">
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
                                    <Fab size="small" className="close">
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
                        message="Delete Artist"
                    />
                }
            />
            
        </Fragment>

    )

}

export default ArtistList
