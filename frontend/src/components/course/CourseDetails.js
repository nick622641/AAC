import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCourseDetails, getCourses, clearErrors } from '../../actions/courseActions'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import Modal from '../modals/Modal'
import Contact from '../modals/Contact'
import Social from '../layouts/Social'
import IconButton from '@mui/material/IconButton'
import EmailIcon from '@mui/icons-material/Email'
import Sidebar from './Sidebar'
import RichtextOutput from '../layouts/richtext/RichtextOutput'
import { Divider } from '@mui/material'
import { COURSE_DETAILS_SUCCESS } from '../../constants/courseConstants'

const CourseDetails = () => {   

    const slug = useParams().slug  
    
    const alert    = useAlert()
    const dispatch = useDispatch()

    const { courses                } = useSelector( state => state.courses )
    const { loading, course, error } = useSelector( state => state.courseDetails )

    const [ modalType,         setIModalType        ] = useState()    
    const [ isModalVisible,    setIsModalVisible    ] = useState(false)

    const toggleModal = (modalType) => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)  
        setIModalType(modalType)   
    }   

    useEffect( () => {   

        dispatch(getCourseDetails(slug))

        dispatch(getCourses(1))  
        
        if(error) { 
            alert.error(error)
            dispatch(clearErrors())
        }     

    }, [dispatch, alert, error, slug ])    
    
    return (

        <Fragment>  

            {loading ? <Loader /> : (

                <Fragment>

                    <MetaData title={COURSE_DETAILS_SUCCESS.title} description={COURSE_DETAILS_SUCCESS.description} />              
                    
                    <div className="container">

                        <div className="wrapper parent">

                            <aside>

                                <Sidebar staffMembers={courses} />  

                            </aside>

                            <article>

                                <h1 style={{ marginBottom: "10px" }}>{course.title}</h1> 

                                <Divider style={{ marginBottom: "40px" }} />

                                <div> 

                                    <iframe 
                                        width="560" 
                                        height="315" 
                                        src={course.video} 
                                        title="YouTube video player" 
                                        frameborder="0" 
                                        allow="
                                            accelerometer; 
                                            autoplay; 
                                            clipboard-write; 
                                            encrypted-media; 
                                            gyroscope; 
                                            picture-in-picture" 
                                            allowfullscreen
                                    ></iframe>
                                    
                                </div>                             
                           
                                {course.description && (
                                    <RichtextOutput text={course.description} />
                                )} 
                                  
                                <h3 style={{ marginTop: "40px" }}>Share</h3>                                
                                <h2>Spread the word about {course.title}</h2> 

                                <Social />                              

                                <IconButton onClick={() => {toggleModal(<Contact />)}} color="primary">
                                    <EmailIcon />                                        
                                </IconButton>  

                            </article>

                        </div>

                    </div>     
                    
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

export default CourseDetails
