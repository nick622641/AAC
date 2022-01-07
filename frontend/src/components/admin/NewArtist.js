import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { NEW_ARTIST_RESET } from '../../constants/categoryConstants'
import { newArtist, clearErrors } from '../../actions/categoryActions'

const NewArtist = () => {
    
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')  
    const { loading, error, success } = useSelector(state => state.newArtist)

    useEffect(() => { 
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {            
            alert.success('Artist created successfully')
            navigate('/admin/artists')
            dispatch({ type: NEW_ARTIST_RESET })            
        }
    }, [dispatch, navigate, alert, error, success])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)       
        dispatch(newArtist(formData))
    }   

    return (

        <Fragment>

            <MetaData title={'New Artist'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside><Sidebar /></aside>            

                    <article>          
                            
                        <div className="user-form cart"> 

                            <h1>New Artist</h1>   

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
                                    {loading ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i> : 'CREATE'}
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

export default NewArtist
