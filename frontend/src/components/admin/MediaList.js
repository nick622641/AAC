import React, { Fragment, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getMedia, deleteMedia, clearErrors } from '../../actions/categoryActions'
import { DELETE_MEDIA_RESET } from '../../constants/categoryConstants'

const ArtistList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, media } = useSelector(state => state.media)
    const { error: deleteError, isDeleted } = useSelector(state => state.medium)

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
            alert.success('Media deleted successfully')            
            dispatch({ type: DELETE_MEDIA_RESET })
            navigate('/admin/media')
        }
    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const deleteCategoryHandler = (id) => {
        dispatch(deleteMedia(id))
    }

    const setCategories = () => {
        const data = {
            columns: [                
                {
                    label: 'Media ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },  
                {
                    label: 'Actions',
                    field: 'actions'                  
                }
            ],
            rows: []
        }      
     
        media && media.forEach( m => {
            data.rows.push({                
                id: m._id,
                name: m.name,
                actions: <Fragment>
                    <Link to={`/admin/media/${m._id}`}>
                        <i className="fa fa-pencil"></i>
                    </Link>                     
                    <i 
                        className="fa fa-trash"
                        onClick={() => deleteCategoryHandler(m._id)}
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

                    <aside><Sidebar /></aside>            

                    <article>

                        <h1>Media Category</h1>
                        
                        {loading ? <Loader /> : (
                            <div className="user-form cart mdb-table">
                                <Link to="/admin/medium">
                                    Add &nbsp;
                                    <i className="fa fa-plus" />
                                </Link>
                                <MDBDataTable data={setCategories()} />
                                <Link to="/dashboard"><i className="fa fa-times" /></Link>
                            </div>
                        )}

                    </article>

                </div>

            </div>
            
        </Fragment>

    )

}

export default ArtistList
