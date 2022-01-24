import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { NEW_MEDIA_RESET } from '../../constants/categoryConstants'
import { newMedia, clearErrors } from '../../actions/categoryActions'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

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
            alert.success('Media Created Successfully')
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

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article>       
                            
                        <div className="user-form cart"> 

                            <h1>New Media</h1>   

                            <form onSubmit={submitHandler}>

                                <table>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <h6 className="text-right">Media Name</h6>
                                            </th>
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
                                        ? <CircularProgress color="primary" />
                                        : 'Create'
                                    }
                                </button>

                            </form>
                   
                            <Link to="/admin/media">
                                <Fab 
                                    size="small" 
                                    className="close" 
                                    color="primary"
                                    sx={{ position: 'absolute', top: 10, right: 10 }}
                                >
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

export default NewMedia
