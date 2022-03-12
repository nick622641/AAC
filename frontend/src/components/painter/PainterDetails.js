import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getPainterDetails, getPainters } from '../../actions/painterActions'
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
import { Divider } from '@mui/material'

const PainterDetails = () => {   

    const slug = useParams().slug  
    
    const alert    = useAlert()
    const dispatch = useDispatch()

    const { painters                     } = useSelector( state => state.painters )
    const { loading, painter, error      } = useSelector( state => state.painterDetails )

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

        dispatch(getPainterDetails(slug))

        dispatch(getPainters(1))      
        
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }     

    }, [dispatch, alert, error, slug ])      

    return (

        <Fragment>  

            {loading ? <Loader /> : (

                <Fragment>

                    <MetaData title={painter.title} description={painter.description} />              
                    
                    <div className="bg-grey">

                        <div className="container"> 
                                
                            <div className="wrapper" style={{ paddingBottom: "5px" }}>
                                 
                                {painter.images && (
                                    <img src={painter.images[0].url} alt={painter.title} />
                                )}
                                <ul className="thumbnails" style={{ marginBottom: 0 }}>
                                {painter.images && painter.images.map((image, index) => (
                                    <li 
                                        key={image.public_id}
                                        onClick={() => toggleLightbox(index)}
                                    >
                                        <img 
                                            src={image.thumbUrl} 
                                            alt={painter.name} 
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

                                <Sidebar painters={painters} />  

                            </aside>

                            <article>

                                <h1 style={{ marginBottom: "10px" }}>{painter.title}</h1> 

                                <Divider style={{ marginBottom: "40px" }} />

                                <table style={{ marginBottom: "40px" }}>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <h6 className="text-right">Style</h6>
                                            </th>
                                            <td>{painter.style}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <h6 className="text-right">Medium</h6>
                                            </th>
                                            <td>{painter.medium}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <h6 className="text-right">Inspiration</h6>
                                            </th>
                                            <td>{painter.inspiration}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <h6 className="text-right">Gallery</h6>
                                            </th>
                                            <td>
                                                You can view all the work by {painter.title}&nbsp;                                             
                                                {painter.title && (
                                                    <Link 
                                                        to={`/gallery/artist/${painter.title.replace(' ', '-')}`}
                                                        style={{ textDecoration: "underline" }}
                                                    >
                                                        here
                                                    </Link>
                                                )}
                                                .
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                           
                                {painter.description && (
                                    <RichtextOutput text={painter.description} />
                                )} 

                                <h3 style={{ marginTop: "40px" }}>Share</h3>                                
                                <h2>Spread the word about {painter.title}</h2> 

                                <Social />                              

                                <IconButton onClick={() => {toggleModal(<Contact />)}} color="primary">
                                    <EmailIcon />                                        
                                </IconButton>  

                            </article>

                        </div>

                    </div>                                         

                    {isLightboxVisible && (
                        <Lightbox 
                            product={painter} 
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

export default PainterDetails
