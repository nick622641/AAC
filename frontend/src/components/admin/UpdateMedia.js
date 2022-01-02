import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { UPDATE_MEDIA_RESET } from '../../constants/categoryConstants'
import { getMediaDetails, updateMedia, clearErrors } from '../../actions/categoryActions'

const UpdateArtist = () => {

    const id = useParams().id
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')  
    const { error, medium } = useSelector(state => state.mediaDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.medium)

    useEffect(() => { 
        if (medium && medium._id !== id) {
            dispatch(getMediaDetails(id))
        } else {
            setName(medium.name)
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
            alert.success('Media updated successfully')
            navigate('/admin/media')
            dispatch({ type: UPDATE_MEDIA_RESET })            
        }
    }, [dispatch, navigate, alert, error, isUpdated, updateError, medium, id])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)       
        dispatch(updateMedia(medium._id, formData))
    }   
    return (

        <Fragment>

            <MetaData title={'Update Media'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside><Sidebar /></aside>            

                    <article>     

                        <h1>Update Media</h1>                   
                            
                        <div className="user-form cart"> 

                            <form onSubmit={submitHandler}>

                                <table>
                                    <tbody>
                                        <tr>
                                            <th><h6>Media Name</h6></th>
                                            <td>
                                                <input
                                                    placeholder="Media Name"
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
                   
                            <Link to="/admin/media"><i className="fa fa-times"/></Link>
                            
                        </div>
                        
                    </article>

                </div>

            </div>
            
        </Fragment>
    )
}

export default UpdateArtist
