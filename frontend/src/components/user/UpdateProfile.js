import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { Link, useNavigate } from 'react-router-dom'

const UpdateProfile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default-avatar.jpg')     
    const alert = useAlert()
    const { user } = useSelector(state => state.auth )
    const { error, isUpdated, loading } = useSelector(state => state.user )

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
            alert.success('User updated successfully')
            dispatch(loadUser())
            navigate('/me')              
            dispatch({ type: UPDATE_PROFILE_RESET })
        }
    }, [dispatch, alert, error, navigate, isUpdated, user])

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
                      
                        <h2>Update Profile</h2>

                        <table>
                            <tbody>
                                <tr>                                    
                                    <td>
                                        <label className="avatar">
                                          
                                            <img 
                                                src={avatarPreview} 
                                                alt='Avatar Preview' 
                                            />                                            
                                            <input
                                                type='file'   
                                                name="avatar"                            
                                                accept="images/*"
                                                onChange={onChange} 
                                            />         
                                        </label>
                                    </td>
                                    <td className="vertical-align-top">
                                        <label>
                                            <input 
                                                type="name" 
                                                placeholder="Name"
                                                name='name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </label>
                                        <label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                name='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
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
                            Update
                        </button>

                        <Link to="/me"><i className="fa fa-times"></i></Link>

                    </form>

                </div>

            </div>

        </Fragment>
    )
}

export default UpdateProfile
