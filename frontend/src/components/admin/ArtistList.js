import React, { Fragment, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getArtists, deleteArtist, clearErrors } from '../../actions/categoryActions'
import { DELETE_ARTIST_RESET } from '../../constants/categoryConstants'

const ArtistList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, artists } = useSelector(state => state.artists)
    const { error: deleteError, isDeleted } = useSelector(state => state.artist)

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
            alert.success('Artist deleted successfully')            
            dispatch({ type: DELETE_ARTIST_RESET })
            navigate('/admin/artists')
        }
    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const deleteCategoryHandler = (id) => {
        dispatch(deleteArtist(id))
    }

    const setCategories = () => {
        const data = {
            columns: [                
                {
                    label: 'Artist ID',
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
        artists && artists.forEach( artist => {
            data.rows.push({                
                id: <small>{artist._id}</small>,
                name: artist.name,
                actions: <Fragment>
                            <Link to={`/admin/artist/${artist._id}`}>
                                <i className="fa fa-pencil"/>
                            </Link> 
                            &nbsp; &nbsp;                    
                            <i 
                                className="fa fa-trash-o"
                                onClick={() => deleteCategoryHandler(artist._id)}
                            />
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

                    <aside><Sidebar /></aside>            

                    <article>

                        <h1>Artist Category</h1>
                        
                        {loading ? <Loader /> : (
                            <div className="user-form cart mdb-table">
                                <Link to="/admin/artist">
                                    Add &nbsp;
                                    <i className="fa fa-plus" />
                                </Link>
                                <br /><br />
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
