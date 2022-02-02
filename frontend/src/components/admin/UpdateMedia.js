import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { UPDATE_MEDIA_RESET } from '../../constants/categoryConstants'
import { getMediaDetails, updateMedia, clearErrors } from '../../actions/categoryActions'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import { FormControl, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

const UpdateArtist = () => {

    const id = useParams().id
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')  
    const { error, medium                          } = useSelector(state => state.mediaDetails)
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

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article>      
                            
                        <div className="user-form cart"> 

                            <h1>Update Media</h1>     

                            <form onSubmit={submitHandler}>

                                <FormControl fullWidth>
                                    <TextField 
                                        label="Media Name" 
                                        value={name}
                                        variant="standard"
                                        onChange={(e) => setName(e.target.value)} 
                                        sx={{ mb: 1 }}
                                    />                                 
                                </FormControl>

                                <LoadingButton 
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained" 
                                    type="submit"
                                    endIcon={<SendIcon />}
                                    sx={{ mt: 4, width: '100%' }}
                                >
                                    Update
                                </LoadingButton>                                  
                               
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

export default UpdateArtist
