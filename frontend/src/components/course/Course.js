import React from 'react'
import { Link } from 'react-router-dom'
import FormattedDate from '../layouts/FormattedDate'

const Course = ({ course }) => { 

    return (
        
        <Link to={`/course/${course.slug}`} className="showroom-item"> 

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

            <div>    

                <h6 
                    className="text-center"
                    style={{ marginTop: "20px" }}
                >
                    {course.title}
                </h6> 

                <div className="text-center">

                    <p style={{ marginBottom: "10px" }}>
                        
                            <small>
                                Member since&nbsp;
                                <b><FormattedDate iso={course.createdAt} format="date" /></b>
                            </small>
                       
                    </p>                
                    
                    <span className="primary-color" style={{ fontSize: "22px" }}>
                        Read More                
                    </span> 

                </div>                        
                                       
            </div>

        </Link>

    )

}

export default Course
