import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { UPDATE_ORIENTATION_RESET } from '../../constants/categoryConstants'
import { getOrientationDetails, updateOrientation, clearErrors } from '../../actions/categoryActions'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import { FormControl, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import IconButton from '@mui/material/IconButton'
import FitScreenIcon from '@mui/icons-material/FitScreen'

const UpdateOrientation = () => {

    const id = useParams().id
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ name,       setName       ] = useState('')  
    const [ fullscreen, setFullscreen ] = useState(false)
    const { error, orientation                     } = useSelector(state => state.orientationDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.orientation)

    useEffect(() => { 

        if (orientation && orientation._id !== id) {
            dispatch(getOrientationDetails(id))
        } else {
            setName(orientation.name)
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
            alert.success('Orientation Updated Successfully')
            dispatch(getOrientationDetails(id))
            navigate('/admin/orientations')
            dispatch({ type: UPDATE_ORIENTATION_RESET })            
        }
    }, [dispatch, navigate, alert, error, isUpdated, updateError, orientation, id])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)       
        dispatch(updateOrientation(orientation._id, formData))
    }   
    return (

        <Fragment>

            <MetaData title={'Update Orientation'} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>      
                            
                        <div className="user-form cart"> 

                            <h1>Update Orientation</h1>      

                            <form onSubmit={submitHandler}>

                                <FormControl fullWidth>
                                    <TextField 
                                        label="Orientation Name" 
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
                   
                            <Link to="/admin/orientations">
                                <Fab 
                                    size="small" 
                                    className="close" 
                                    color="primary"
                                    sx={{ position: 'absolute', top: 10, right: 10 }}
                                >
                                    <CloseIcon />
                                </Fab>
                            </Link>

                            <IconButton 
                                color="primary" 
                                sx={{ position: 'absolute', top: 10, left: 10 }}
                                onClick={() => setFullscreen(!fullscreen)}
                            >
                                <FitScreenIcon />
                            </IconButton>
                            
                        </div>
                        
                    </article>

                </div>

            </div>
            
        </Fragment>

    )

}

export default UpdateOrientation
