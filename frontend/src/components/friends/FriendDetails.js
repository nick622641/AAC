import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFriendDetails, getFriends } from '../../actions/friendActions'
import { getStaff } from '../../actions/staffActions'
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
import Sidebar from '../staff/Sidebar'
import RichtextOutput from '../layouts/richtext/RichtextOutput'
import { Avatar, Divider } from '@mui/material'

const FriendDetails = () => {   

    const slug = useParams().slug  
    
    const alert    = useAlert()
    const dispatch = useDispatch()

    const { friends                } = useSelector( state => state.friends )
    const { loading, friend, error } = useSelector( state => state.friendDetails )
    const { staffMembers           } = useSelector( state => state.staffMembers )

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

        dispatch(getFriendDetails(slug))

        dispatch(getFriends(1))  
        dispatch(getStaff(1))    
        
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }     

    }, [dispatch, alert, error, slug ])    
    
    return (

        <Fragment>  

            {loading ? <Loader /> : (

                <Fragment>

                    <MetaData title={friend.title} description={friend.description} />              
                    
                    <div className="container">

                        <div className="wrapper parent">

                            <aside>

                                <Sidebar staffMembers={staffMembers} friends={friends} />  

                            </aside>

                            <article>

                                <h1 style={{ marginBottom: "10px" }}>{friend.title}</h1> 

                                <Divider style={{ marginBottom: "40px" }} />

                                <div className="parent" style={{ marginBottom: "40px" }}>
                                    {friend.avatar && (
                                         <Avatar 
                                            src={friend.avatar.url} 
                                            alt={friend.name} 
                                            sx={{ width: 175, height: 175 }}
                                        />
                                    )}                                   

                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <h6 className="text-right">Background</h6>
                                                </th>
                                                <td>{friend.background}</td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <h6 className="text-right">Profession</h6>
                                                </th>
                                                <td>{friend.profession}</td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <h6 className="text-right">Interests</h6>
                                                </th>
                                                <td>{friend.interests}</td>
                                            </tr>                                        
                                        </tbody>
                                    </table>
                                    
                                </div>                                
                           
                                {friend.description && (
                                    <RichtextOutput text={friend.description} />
                                )} 
                                  
                                <h3 style={{ marginTop: "40px" }}>Share</h3>                                
                                <h2>Spread the word about {friend.title}</h2> 

                                <Social />                              

                                <IconButton onClick={() => {toggleModal(<Contact />)}} color="primary">
                                    <EmailIcon />                                        
                                </IconButton>  

                            </article>

                        </div>

                    </div>                                         

                    {isLightboxVisible && (
                        <Lightbox 
                            product={friend} 
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

export default FriendDetails
