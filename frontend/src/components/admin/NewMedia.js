import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { NEW_MEDIA_RESET } from '../../constants/categoryConstants'
import { newMedia, clearErrors } from '../../actions/categoryActions'

const NewMedia = () => {
    
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')  
    const { loading, error, success } = useSelector(state => state.newMedia)

    useEffect(() => { 
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {            
            alert.success('Media created successfully')
            navigate('/admin/media')
            dispatch({ type: NEW_MEDIA_RESET })            
        }
    }, [dispatch, navigate, alert, error, success])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)       
        dispatch(newMedia(formData))
    }   

    return (

        <Fragment>

            <MetaData title={'New Media'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside><Sidebar /></aside>            

                    <article>     

                        <h1>New Media</h1>                   
                            
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
                                    {loading ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i> : 'CREATE'}
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

export default NewMedia
