import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { UPDATE_ARTIST_RESET } from '../../constants/categoryConstants'
import { getArtistDetails, updateArtist, clearErrors } from '../../actions/categoryActions'

const UpdateArtist = () => {

    const id = useParams().id
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')  
    const { error, artist } = useSelector(state => state.artistDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.artist)

    useEffect(() => { 
        if (artist && artist._id !== id) {
            dispatch(getArtistDetails(id))
        } else {
            setName(artist.name)
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
            alert.success('Artist updated successfully')
            navigate('/admin/artists')
            dispatch({ type: UPDATE_ARTIST_RESET })            
        }
    }, [dispatch, navigate, alert, error, isUpdated, updateError, artist, id])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)       
        dispatch(updateArtist(artist._id, formData))
    }   
    return (

        <Fragment>

            <MetaData title={'Update Artist'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside><Sidebar /></aside>            

                    <article>        
                            
                        <div className="user-form cart"> 

                            <h1>Update Artist</h1>   

                            <form onSubmit={submitHandler}>

                                <table>
                                    <tbody>
                                        <tr>
                                            <th><h6>Artist Name</h6></th>
                                            <td>
                                                <input
                                                    placeholder="Artist Name"
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
                   
                            <Link to="/admin/artists"><i className="fa fa-times"/></Link>
                            
                        </div>
                        
                    </article>

                </div>

            </div>
            
        </Fragment>
    )
}

export default UpdateArtist
