import React, { Fragment, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrientations, deleteOrientation, clearErrors } from '../../actions/categoryActions'
import { DELETE_ORIENTATION_RESET } from '../../constants/categoryConstants'

const OrientationList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, orientations } = useSelector(state => state.orientations)
    const { error: deleteError, isDeleted } = useSelector(state => state.orientation)

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
            navigate('/admin/orientations')
        }

    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const deleteCategoryHandler = (id) => {
        if ( window.confirm("Are you Sure?") === true ) {
            dispatch(deleteOrientation(id))
        }         
    }

    const setCategories = () => {
        const data = {
            columns: [                
                {
                    label: 'Orientation ID',
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
        orientations && orientations.forEach( orientation => {
            data.rows.push({                
                id: <small>{orientation._id}</small>,
                name: orientation.name,
                actions: 
                    <Fragment>
                        <Link to={`/admin/orientation/${orientation._id}`}>
                            <i className="fa fa-pencil" />
                        </Link>  
                        &nbsp; &nbsp;                   
                        <i 
                            className="fa fa-trash-o"
                            onClick={() => deleteCategoryHandler(orientation._id)}
                        /> 
                    </Fragment> 
            })
        })
        return data
    }    

    return (

        <Fragment>

            <MetaData title={'All Orientations'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article>
                        
                        {loading ? <Loader /> : (

                            <div className="user-form cart">

                                <h1>Orientation Category</h1>

                                <p className="text-right">
                                    <Link to="/admin/orientation">
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
            
        </Fragment>

    )

}

export default OrientationList
