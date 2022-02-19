import React from 'react'
import { Link } from 'react-router-dom'
import FormattedDate from '../layouts/FormattedDate'

const Blog = ({ blog }) => {

    let title = blog.title.replace(/-/g, '_')    
    title = title.replace(/ /g, '-') 

    return (
        
        <Link to={`/blog/${title}`} className="showroom-item"> 

            <div> 

                <figure>
                    <img                      
                        src={blog.images[0].thumbUrl} 
                        alt={blog.name} 
                        className="object-fit"
                    /> 
                </figure>  
                
            </div> 

            <div>    

                <h6 
                    className="text-center"
                    style={{ marginTop: "20px" }}
                >
                    {blog.title}
                </h6> 

                <div className="text-center">

                    <p style={{ marginBottom: "10px" }}>
                        
                            <small>
                                By <b>{blog.name} </b>
                                on <b><FormattedDate iso={blog.createdAt} format="date" /></b>
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

export default Blog
