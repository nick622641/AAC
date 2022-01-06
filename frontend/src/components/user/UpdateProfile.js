import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import MetaData from '../layouts/MetaData'

const UpdateProfile = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ avatar, setAvatar ] = useState('')
    const [ avatarPreview, setAvatarPreview ] = useState('/images/default-avatar.jpg')   
    const { user } = useSelector( state => state.auth )
    const { loading, isUpdated, error } = useSelector( state => state.user )

    useEffect(() => {
        if(user) {
            setName(user.name)  
            setEmail(user.email)   
            setAvatarPreview(user.avatar.url)  
        }
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }
        if(isUpdated) {
            alert.success('User Updated Successfully')
            dispatch(loadUser())
            navigate('/me')              
            dispatch({ type: UPDATE_PROFILE_RESET })
        }
    }, [dispatch, navigate, user, alert, isUpdated, error])

    const submitHandler = (e) => {        
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)
        formData.set('email', email)
        formData.set('avatar', avatar)
        dispatch(updateProfile(formData))
    }

    const onChange = (e) => { 
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return (

        <Fragment>

            <MetaData title={'Update Profile'} />

            <div className="container">
                <div className="wrapper">  

                    <form className="user-form" onSubmit={submitHandler} encType='multipart/form-data'>
                      
                        <h1>Update Profile</h1>

                        <table className="middle-align">
                            <tbody>
                                <tr>                                    
                                    <td>
                                        <label className="avatar">                                          
                                            <img 
                                                src={avatarPreview} 
                                                alt='Avatar Preview' 
                                                className="centered-image"
                                            />                                            
                                            <input
                                                type='file'   
                                                onChange={onChange} 
                                            />         
                                        </label>
                                    </td>
                                    <td>
                                        <label>
                                            <input 
                                                type="name" 
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </label>
                                        <label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>        
                       
                        <button 
                            className="submit"
                            disabled={loading ? true : false}
                        >
                            {loading ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw"/> : 'Update'}
                        </button>

                        <Link to="/me"><i className="fa fa-times"/></Link>

                    </form>

                </div>

            </div>

        </Fragment>
    )
}

export default UpdateProfile
