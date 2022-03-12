import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPageDetails, getPages } from '../../actions/pageActions'
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

const PageDetails = () => {   

    const slug = useParams().slug  
    
    const alert    = useAlert()
    const dispatch = useDispatch()

    const { pages                         } = useSelector( state => state.pages )
    const { loading, page, error          } = useSelector( state => state.pageDetails )

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

        dispatch(getPageDetails(slug))

        dispatch(getPages(1))      
        
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }         

    }, [dispatch, alert, error, slug  ])      

    return (

        <Fragment>  

            {loading ? <Loader /> : (

                <Fragment>

                    <MetaData title={page.title} description={page.description} />              
                    
                    <div className="bg-grey">

                        <div className="container"> 
                                
                            <div className="wrapper" style={{ paddingBottom: "5px" }}>
                                 
                                {page.images && (
                                    <img src={page.images[0].url} alt={page.title} />
                                )}
                                <ul className="thumbnails" style={{ marginBottom: 0 }}>
                                {page.images && page.images.map((image, index) => (
                                    <li 
                                        key={image.public_id}
                                        onClick={() => toggleLightbox(index)}
                                    >
                                        <img 
                                            src={image.thumbUrl} 
                                            alt={page.name} 
                                            className="object-fit"
                                        />
                                    </li>
                                ))}
                                </ul>   

                            </div>

                        </div>

                    </div>

                    <div className="container">

                        <div className="wrapper parent">

                            <aside>

                                <Sidebar pages={pages} />  

                            </aside>

                            <article>

                                <h1 style={{ marginBottom: "10px" }}>{page.title}</h1>                                              

                                {page.description && (
                                    <RichtextOutput text={page.description} />
                                )}   

                                <Social />                              

                                <IconButton onClick={() => {toggleModal(<Contact />)}} color="primary">
                                    <EmailIcon />                                        
                                </IconButton>  

                            </article>

                        </div>

                    </div>                                                

                    {isLightboxVisible && (
                        <Lightbox 
                            product={page} 
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

export default PageDetails
