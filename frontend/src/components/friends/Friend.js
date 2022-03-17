import React from 'react'
import { Link } from 'react-router-dom'
import FormattedDate from '../layouts/FormattedDate'

const Friend = ({ friend }) => { 

    return (
        
        <Link to={`/friend/${friend.slug}`} className="showroom-item"> 

            <div> 

                <figure>
                    <img                      
                        src={friend.avatar.url} 
                        alt={friend.name} 
                        className="object-fit"
                    /> 
                </figure>  
                
            </div> 

            <div>    

                <h6 
                    className="text-center"
                    style={{ marginTop: "20px" }}
                >
                    {friend.title}
                </h6> 

                <div className="text-center">

                    <p style={{ marginBottom: "10px" }}>
                        
                            <small>
                                Member since&nbsp;
                                <b><FormattedDate iso={friend.createdAt} format="date" /></b>
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

export default Friend
