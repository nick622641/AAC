import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

    const date = new Date(blog.createdAt)
    const createdAt = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()

    return (
        
        <Link to={`/blog/${blog._id}`} className="showroom-item"> 

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
                                on <b>{createdAt}</b>
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
