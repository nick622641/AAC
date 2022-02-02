import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { NEW_ORIENTATION_RESET } from '../../constants/categoryConstants'
import { newOrientation, clearErrors } from '../../actions/categoryActions'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import { FormControl, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

const NewOrientation = () => {
    
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')  
    const { loading, error, success } = useSelector( state => state.newOrientation )

    useEffect(() => { 
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {            
            alert.success('Orientation Created Successfully')
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

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article>         
                            
                        <div className="user-form cart"> 

                            <h1>New Orientation</h1>   

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
                                    Create
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
                        </div>
                        
                    </article>

                </div>

            </div>
            
        </Fragment>

    )
    
}

export default NewOrientation
