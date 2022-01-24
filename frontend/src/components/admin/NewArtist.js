import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { NEW_ARTIST_RESET } from '../../constants/categoryConstants'
import { newArtist, clearErrors } from '../../actions/categoryActions'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

const NewArtist = () => {
    
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')  
    const { loading, error, success } = useSelector( state => state.newArtist )

    useEffect(() => { 
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {            
            alert.success('Artist Created Ssuccessfully')
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

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article>          
                            
                        <div className="user-form cart"> 

                            <h1>New Artist</h1>   

                            <form onSubmit={submitHandler}>

                                <table>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <h6 className="text-right">Artist Name</h6>
                                            </th>
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
                                    {loading 
                                        ? <CircularProgress color="primary" />
                                        : 'Create'
                                    }
                                </button>

                            </form>
                   
                            <Link to="/admin/artists">
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

export default NewArtist
