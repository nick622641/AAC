import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getMedia, deleteMedia, clearErrors } from '../../actions/categoryActions'
import { DELETE_MEDIA_RESET } from '../../constants/categoryConstants'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'

const ArtistList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, media         } = useSelector( state => state.media )
    const { error: deleteError, isDeleted } = useSelector( state => state.medium )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,  setId ] = useState('')

    useEffect(() => {

        dispatch(getMedia())

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        } 
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }      
        if(isDeleted) {
            alert.success('Media Deleted Successfully')            
            dispatch({ type: DELETE_MEDIA_RESET })
        }

    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const deleteCategoryHandler = (id) => {
        dispatch(deleteMedia(id))
    }

    const setCategories = () => {
        const data = {
            columns: [                
                {
                    label: 'Media ID',
                    field: 'id',
                    sort: 'disabled'
                },
                {
                    label: 'Name',
                    field: 'name',
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
     
        media && media.forEach( m => {
            data.rows.push({                
                id: <small>{m._id}</small>,
                name: m.name,
                actions: 
                    <Fragment>
                        <Link to={`/admin/media/${m._id}`}>
                            <i className="fa fa-pencil" />
                        </Link>   
                        &nbsp; &nbsp;                  
                        <i 
                            className="fa fa-trash-o"
                            onClick={() => {
                                setIsModalVisible(!isModalVisible)
                                setId(m._id)
                            }}
                        /> 
                    </Fragment> 
            })
        })    
       
        return data
    }    

    return (

        <Fragment>

            <MetaData title={'All Media'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article>
                        
                        {loading ? <Loader /> : (

                            <div className="user-form cart">

                                <h1>Media Category</h1>

                                <p className="text-right">
                                    <Link to="/admin/medium">
                                        Add &nbsp;<i className="fa fa-plus" />
                                    </Link>
                                </p>                                

                                <MDBDataTable 
                                    className="mdb-table"
                                    data={setCategories()} 
                                />

                                <Link to="/dashboard"><i className="fa fa-times" /></Link>

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
                        message="Delete Medium"
                    />
                }
            />
            
        </Fragment>

    )

}

export default ArtistList
