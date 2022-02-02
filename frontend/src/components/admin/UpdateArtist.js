import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { UPDATE_ARTIST_RESET } from '../../constants/categoryConstants'
import { getArtistDetails, updateArtist, clearErrors } from '../../actions/categoryActions'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import { FormControl, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'

const UpdateArtist = () => {

    const id = useParams().id
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')  
    const { error, artist                          } = useSelector(state => state.artistDetails)
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
            alert.success('Artist Updated Successfully')
            dispatch(getArtistDetails(id))
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

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article>        
                            
                        <div className="user-form cart"> 

                            <h1>Update Artist</h1>   

                            <form onSubmit={submitHandler}>

                                <FormControl fullWidth>
                                    <TextField 
                                        label="Artist Name" 
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

export default UpdateArtist
