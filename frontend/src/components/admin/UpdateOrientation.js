import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { UPDATE_ORIENTATION_RESET } from '../../constants/categoryConstants'
import { getOrientationDetails, updateOrientation, clearErrors } from '../../actions/categoryActions'

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
            alert.success('Orientation updated successfully')
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

                    <aside><Sidebar /></aside>            

                    <article>     

                        <h1>Update Orientation</h1>                   
                            
                        <div className="user-form cart"> 

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
                                    {loading ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i> : 'UPDATE'}
                                </button>

                            </form>
                   
                            <Link to="/admin/orientations"><i className="fa fa-times"/></Link>
                            
                        </div>
                        
                    </article>

                </div>

            </div>
            
        </Fragment>
    )
}

export default UpdateOrientation
