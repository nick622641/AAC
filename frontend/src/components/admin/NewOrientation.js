import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { NEW_ORIENTATION_RESET } from '../../constants/categoryConstants'
import { newOrientation, clearErrors } from '../../actions/categoryActions'

const NewOrientation = () => {
    
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')  
    const { loading, error, success } = useSelector(state => state.newOrientation)

    useEffect(() => { 
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {            
            alert.success('Orientation created successfully')
            navigate('/admin/orientations')
            dispatch({ type: NEW_ORIENTATION_RESET })            
        }
    }, [dispatch, navigate, alert, error, success])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)       
        dispatch(newOrientation(formData))
    }   

    return (

        <Fragment>

            <MetaData title={'New Orientation'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside><Sidebar /></aside>            

                    <article>     

                        <h1>New Orientation</h1>                   
                            
                        <div className="user-form cart"> 

                            <form onSubmit={submitHandler}>

                                <table>
                                    <tbody>
                                        <tr>
                                            <th><h6>Artist Name</h6></th>
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
                                    {loading ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i> : 'CREATE'}
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

export default NewOrientation
