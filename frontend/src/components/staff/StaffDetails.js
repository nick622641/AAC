import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getStaffDetails, getStaff } from '../../actions/staffActions'
import { getFriends } from '../../actions/friendActions'
import { clearErrors } from '../../actions/userActions'
import { useSpring } from 'react-spring'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import Modal from '../modals/Modal'
import Contact from '../modals/Contact'
import Lightbox from '../layouts/images/Lightbox'
import Social from '../layouts/Social'
import IconButton from '@mui/material/IconButton'
import EmailIcon from '@mui/icons-material/Email'
import Sidebar from './Sidebar'
import RichtextOutput from '../layouts/richtext/RichtextOutput'
import { Avatar, Divider } from '@mui/material'
import SimpleCarousel from '../layouts/images/SimpleCarousel'

const StaffDetails = () => {   

    const slug = useParams().slug  
    
    const alert    = useAlert()
    const dispatch = useDispatch()

    const { friends                } = useSelector( state => state.friends )
    const { staffMembers          } = useSelector( state => state.staffMembers )
    const { loading, staffMember, error } = useSelector( state => state.staffDetails )

    const [ modalType,         setIModalType        ] = useState()    
    const [ imageIndex,        setIImageIndex       ] = useState(0)   
    const [ isModalVisible,    setIsModalVisible    ] = useState(false)
    const [ isLightboxVisible, setIsLightboxVisible ] = useState(false)        

    const toggleModal = (modalType) => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)  
        setIModalType(modalType)   
    }   
    const toggleLightbox = (imgIndex) => {   
        setIImageIndex(imgIndex)      
        setIsLightboxVisible(wasLightboxVisible => !wasLightboxVisible)   
    } 
    const slideTopAnimation = useSpring({     
        opacity: isLightboxVisible ? 1 : 0,
        transform: isLightboxVisible ? `translateY(0%)` : `translateY(-100%)`
    })  

    useEffect( () => {   

        dispatch(getStaffDetails(slug))

        dispatch(getStaff(1))  
        dispatch(getFriends(1))    
        
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }     

    }, [dispatch, alert, error, slug ])    
    
    return (

        <Fragment>  

            {loading ? <Loader /> : (

                <Fragment>

                    <MetaData title={staffMember.title} description={staffMember.description} />              
                    
                    <div className="container">

                        <div className="breadcrumbs">
                            <Link to="/">
                                <small>Home</small>
                            </Link>
                            &nbsp;/&nbsp;
                            <Link to="/blogs">
                                <small>Staff Members</small>
                            </Link>
                            &nbsp;/&nbsp;
                            <span>
                                <small>{staffMember.title}</small>
                            </span>
                        </div>

                        <div className="wrapper parent">

                            <aside>

                                <Sidebar staffMembers={staffMembers} friends={friends} />  

                            </aside>

                            <article>

                                <h1 style={{ marginBottom: "10px" }}>{staffMember.title}</h1> 

                                <Divider style={{ marginBottom: "40px" }} />

                                <div className="parent" style={{ marginBottom: "40px" }}>
                                    {staffMember.avatar && (
                                         <Avatar 
                                            src={staffMember.avatar.url} 
                                            alt={staffMember.name} 
                                            sx={{ width: 175, height: 175 }}
                                        />
                                    )}                                   

                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <h6 className="text-right">Background</h6>
                                                </th>
                                                <td>{staffMember.background}</td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <h6 className="text-right">Profession</h6>
                                                </th>
                                                <td>{staffMember.profession}</td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <h6 className="text-right">Interests</h6>
                                                </th>
                                                <td>{staffMember.interests}</td>
                                            </tr>                                        
                                        </tbody>
                                    </table>
                                    
                                </div>                                
                           
                                {staffMember.description && (
                                    <RichtextOutput text={staffMember.description} />
                                )} 
                                {staffMember.images && (
                                    <SimpleCarousel data={staffMember.images} name={staffMember.title} />
                                )}    
                                <h3 style={{ marginTop: "40px" }}>Share</h3>                                
                                <h2>Spread the word about {staffMember.title}</h2> 

                                <Social />                              

                                <IconButton onClick={() => {toggleModal(<Contact />)}} color="primary">
                                    <EmailIcon />                                        
                                </IconButton>  

                            </article>

                        </div>

                    </div>                                         

                    {isLightboxVisible && (
                        <Lightbox 
                            product={staffMember} 
                            isLightboxVisible={isLightboxVisible} 
                            toggleLightbox={() => toggleLightbox(imageIndex)}  
                            slideTopAnimation={slideTopAnimation}
                            imgIndex={imageIndex}  
                        />
                    )}                        
                    
                    <Modal
                        isModalVisible={isModalVisible} 
                        onBackdropClick={toggleModal}   
                        content={modalType}
                    />  

                </Fragment>

            )}

        </Fragment>    

    )

}

export default StaffDetails
