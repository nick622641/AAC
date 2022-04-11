import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateStaff, getAdminStaffDetails, updateImages, deleteImage, clearErrors } from '../../../actions/staffActions'
import { UPDATE_STAFF_RESET } from '../../../constants/staffConstants'
import { DELETE_IMAGE_RESET } from '../../../constants/staffConstants'
import { FormControl, FormControlLabel, IconButton, TextField, Tooltip } from '@mui/material'
import MetaData from '../../layouts/MetaData'
import Sidebar from '../Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import DragnDrop from '../DragnDrop'
import Modal from '../../modals/Modal'
import Confirm from '../../modals/Confirm'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import Checkbox from '@mui/material/Checkbox'
import RichtextEditor from '../../layouts/richtext/RichtextEditor'
import RichtextPreview from '../../layouts/richtext/RichtextPreview'

const UpdateStaff = () => {

    const alert     = useAlert()
    const navigate  = useNavigate()    
    const dispatch  = useDispatch()

    const staffId   = useParams().id

    const { error, staffMember } = useSelector( state => state.adminStaffDetails )
    const { loading, isUpdated, error: updateError, error: deleteError, isDeleted } = useSelector( state => state.staff )  
    
    const [ title,           setTitle          ] = useState('')
    const [ slug,            setSlug           ] = useState('')
    const [ description,     setDescription    ] = useState('')  
    const [ background,      setBackground     ] = useState('')   
    const [ profession,      setProfession     ] = useState('')   
    const [ interests,       setInterests      ] = useState('') 
    const [ visible,         setVisible        ] = useState(1) 
    const [ images,          setImages         ] = useState([])   
    const [ oldImages,       setOldImages      ] = useState([])
    const [ imagesPreview,   setImagesPreview  ] = useState([])  
    const [ avatar,          setAvatar         ] = useState('') 
    const [ avatarPreview,   setAvatarPreview  ] = useState('')    

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ imgIndex,        setImageIndex     ] = useState('')
    const [ imgId,           setImageId        ] = useState('')
    const [ init,            setInit           ] = useState(0)
    const [ final,           setFinal          ] = useState(0)
    const [ fullscreen,      setFullscreen     ] = useState(false)

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const deleteImageHandler = (id, imgIndex, imgId) => {
        dispatch(deleteImage(id, imgIndex, imgId))
    }  

    const updateImagesHandler = (id, initPos, finPos) => {
        dispatch(updateImages(id, initPos, finPos))
    }  

    useEffect(() => {       

        if (staffMember && staffMember._id !== staffId  ) {              

            dispatch(getAdminStaffDetails(staffId  ))             

        } else {
            
            setTitle(staffMember.title)
            setSlug(staffMember.slug)
            setDescription(staffMember.description)  
            setBackground(staffMember.background)    
            setProfession(staffMember.profession) 
            setInterests(staffMember.interests)  
            setOldImages(staffMember.images)   
            setAvatarPreview(staffMember.avatar.url)  
            setVisible(staffMember.visible)     
        }

        if(error) {
            return alert.error(error)
        }

        if(updateError) {
            return alert.error(updateError)
        }
        
        if(isUpdated) {            
            alert.success('Staff member Updated Successfully')
            dispatch(getAdminStaffDetails( staffId  ))  
            dispatch({ type: UPDATE_STAFF_RESET })    
            setImages([])   
        } 
        
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted) {
            alert.success('Image Deleted Successfully') 
            dispatch(getAdminStaffDetails( staffId ))    
            dispatch({ type: DELETE_IMAGE_RESET })            
        }
        
    }, [dispatch, navigate, staffMember, staffId  , alert, error, isUpdated, updateError, deleteError, isDeleted ])

    const submitHandler = (e) => {
        setImagesPreview([])
        e.preventDefault()
        const formData = new FormData()
        formData.set('title', title)
        formData.set('slug', slug)
        formData.set('description', description)   
        formData.set('background', background)       
        formData.set('profession', profession)       
        formData.set('interests', interests)   
        formData.set('visible', visible)  
        formData.set('avatar', avatar)
        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(updateStaff(staffMember._id, urlencodeFormData(formData) ))
    }

    const onChange = e => {
        const files = Array.from(e.target.files)
        setImagesPreview([])
        setImages([])
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])                    
                }                
            }
            reader.readAsDataURL(file)
        })        
    }  
    const onAvatarChange = (e) => {        
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    } 

    const urlencodeFormData = ( formData ) => {
        const params = new URLSearchParams()
        for( let pair of formData.entries() ) {
            typeof pair[1]=='string' && params.append( pair[0], pair[1] )
        }
        return params.toString()
    }
    
    const sanitizeInput = (value) => {
        value = value.replace(/[^\w -]/ig, '')
        value = value.replace(/ /ig, '-')
        setSlug(value.toLowerCase())
    }

    return (

        <Fragment>

            <MetaData title={'Update Staff Member'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                    
                    </aside>            

                    <article className={fullscreen ? 'fullscreen' : ''}> 

                        <div className="user-form"> 

                            <form onSubmit={submitHandler} encType='multipart/form-data'>  

                                <div className="parent reverse">

                                    <div>
                                        <label>  
                                            <Avatar 
                                                src={avatarPreview} 
                                                alt='Avatar Preview' 
                                                sx={{ width: 75, height: 75 }}
                                            />                                 
                                            <input
                                                type='file' 
                                                className="hidden-input"  
                                                onChange={onAvatarChange} 
                                            />         
                                        </label>
                                    
                                        <label>                                    
                                            <input
                                                type='file'   
                                                className="hidden-input"
                                                name="product_images"                            
                                                onChange={onChange}   
                                                multiple                              
                                            />   
                                                                    
                                            {oldImages[0] && !imagesPreview[0]  && (
                                                <Avatar
                                                    src={oldImages[0].thumbUrl} 
                                                    alt={title}
                                                    sx={{ width: 150, height: 150, mr: 4, mb: 1 }}
                                                />                                   
                                            )}   
                                            {imagesPreview[0] && (
                                                <Avatar
                                                    src={imagesPreview[0]} 
                                                    alt={title}
                                                    sx={{ width: 150, height: 150, mr: 4, mb: 1 }}
                                                />                                           
                                            )}                                            
                                                
                                        </label>

                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    size="small"
                                                    value={visible}
                                                    onChange={(e) => setVisible(e.target.checked ? 1 : 0 )}
                                                    checked={visible === 1 ? true : false}
                                                />
                                            } 
                                            label={visible === 1 ? 'Published' : 'Draft'} 
                                        /> 

                                    </div>

                                    <div style={{ flexGrow: 1 }}>

                                        <FormControl fullWidth>
                                            <TextField 
                                                label="Staff Member's Name" 
                                                value={title}
                                                variant="standard"
                                                onChange={(e) => {
                                                    setTitle(e.target.value)
                                                    sanitizeInput(e.target.value)
                                                }} 
                                                sx={{ mb: 1 }}
                                            />                                 
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <TextField
                                                label="Url Slug - (Read Only)"
                                                variant="filled"
                                                value={slug}
                                                disabled={true}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </FormControl>    

                                        <FormControl fullWidth sx={{ mb: 1 }}>
                                            <TextField 
                                                label="Background" 
                                                value={background} 
                                                variant="standard"
                                                multiline
                                                onChange={(e) => setBackground(e.target.value)}
                                            />                                 
                                        </FormControl>     

                                        <FormControl fullWidth sx={{ mb: 1 }}>
                                            <TextField 
                                                label="Profession" 
                                                value={profession} 
                                                variant="standard"
                                                multiline
                                                onChange={(e) => setProfession(e.target.value)}
                                            />                                 
                                        </FormControl> 

                                        <FormControl fullWidth sx={{ mb: 1 }}>
                                            <TextField 
                                                label="Interests" 
                                                value={interests} 
                                                variant="standard"
                                                multiline
                                                onChange={(e) => setInterests(e.target.value)}
                                            />                                 
                                        </FormControl>                                      

                                    </div>                           

                                </div>  

                                <DragnDrop 
                                    setIsModalVisible={setIsModalVisible}
                                    setImageIndex={setImageIndex}
                                    setImageId={setImageId}
                                    setInit={setInit}
                                    setFinal={setFinal}
                                    updateImagesHandler={updateImagesHandler}
                                    productId={staffMember._id}                                        
                                    init={init}
                                    final={final}
                                    oldImages={oldImages}
                                    imagesPreview={imagesPreview}
                                />                                  

                                <h4>Content</h4> 

                                {description !== '' && (  

                                    <Fragment>

                                        <RichtextEditor text={description} setText={setDescription} /> 

                                        <RichtextPreview text={description} />

                                    </Fragment>
                                )}                                                                                    
                    
                                <LoadingButton 
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained" 
                                    type="submit"
                                    endIcon={<SendIcon />}
                                    sx={{ mt: 4, width: '100%' }}
                                    disabled={!title || !description || !background || !profession || !interests || !avatar ? true : false}
                                >
                                    Update
                                </LoadingButton>

                            </form>                            

                            <Fab 
                                size="small" 
                                className="close" 
                                color="primary"
                                onClick={() => navigate(-1)} 
                                sx={{ position: 'absolute', top: 10, right: 10 }}
                            >
                                <CloseIcon />
                            </Fab>

                            <Tooltip title="Expand" arrow>
                                <IconButton 
                                    color="primary" 
                                    sx={{ position: 'absolute', top: 10, left: 10 }}
                                    onClick={() => setFullscreen(!fullscreen)}
                                >
                                    <FitScreenIcon />
                                </IconButton>
                            </Tooltip>

                        </div>                        

                    </article>

                </div>

            </div>      

            <Modal
                isModalVisible={isModalVisible} 
                onBackdropClick={toggleModal}   
                content={
                    <Confirm 
                        onBackdropClick={toggleModal} 
                        onConfirm={() => deleteImageHandler(staffMember._id, imgIndex, imgId)} 
                        message="Delete Image"
                    />
                }
            />         

        </Fragment>
        
    )

}

export default UpdateStaff
