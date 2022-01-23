import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { UPDATE_ORIENTATION_RESET } from '../../constants/categoryConstants'
import { getOrientationDetails, updateOrientation, clearErrors } from '../../actions/categoryActions'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

const UpdateOrientation = () => {

    const id = useParams().id
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')  
    const { error, orientation } = useSelector(state => state.orientationDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.orientation)

    useEffect(() => { 
        if (orientation && orientation._id !== id) {
            dispatch(getOrientationDetails(id))
        } else {
            setName(orientation.name)
        }
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }
        if(isUpdated) {            
            alert.success('Orientation Updated Successfully')
            dispatch(getOrientationDetails(id))
            navigate('/admin/orientations')
            dispatch({ type: UPDATE_ORIENTATION_RESET })            
        }
    }, [dispatch, navigate, alert, error, isUpdated, updateError, orientation, id])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)       
        dispatch(updateOrientation(orientation._id, formData))
    }   
    return (

        <Fragment>

            <MetaData title={'Update Orientation'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article>      
                            
                        <div className="user-form cart"> 

                            <h1>Update Orientation</h1>      

                            <form onSubmit={submitHandler}>

                                <table>
                                    <tbody>
                                        <tr>
                                            <th><h6>Orientation Name</h6></th>
                                            <td>
                                                <input
                                                    placeholder="Orientation Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)} 
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                                <button
                                    className="submit"
                                    disabled={loading ? true : false}
                                >
                                    {loading 
                                        ? <CircularProgress sx={{ color: "var(--primary-color)"}} />
                                        : 'Update'
                                    }
                                </button>

                            </form>
                   
                            <Link to="/admin/orientations">
                                <Fab size="small" className="close">
                                    <CloseIcon />
                                </Fab>
                            </Link>
                            
                        </div>
                        
                    </article>

                </div>

            </div>
            
        </Fragment>
    )
}

export default UpdateOrientation
