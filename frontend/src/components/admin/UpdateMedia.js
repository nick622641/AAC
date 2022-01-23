import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { UPDATE_MEDIA_RESET } from '../../constants/categoryConstants'
import { getMediaDetails, updateMedia, clearErrors } from '../../actions/categoryActions'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

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
            alert.success('Media Updated Successfully')
            dispatch(getMediaDetails(id))
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

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article>      
                            
                        <div className="user-form cart"> 

                            <h1>Update Media</h1>     

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
                                    {loading 
                                        ? <CircularProgress sx={{ color: "var(--primary-color)"}} />
                                        : 'Update'
                                    }
                                </button>

                            </form>
                   
                            <Link to="/admin/media">
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

export default UpdateArtist
