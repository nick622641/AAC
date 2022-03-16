import React from 'react'
import { Link } from 'react-router-dom'
import FormattedDate from '../layouts/FormattedDate'

const Staff = ({ staffMember }) => { 

    return (
        
        <Link to={`/staff/${staffMember.slug}`} className="showroom-item"> 

            <div> 

                <figure>
                    <img                      
                        src={staffMember.avatar.url} 
                        alt={staffMember.name} 
                        className="object-fit"
                    /> 
                </figure>  
                
            </div> 

            <div>    

                <h6 
                    className="text-center"
                    style={{ marginTop: "20px" }}
                >
                    {staffMember.title}
                </h6> 

                <div className="text-center">

                    <p style={{ marginBottom: "10px" }}>
                        
                            <small>
                                Member since&nbsp;
                                <b><FormattedDate iso={staffMember.createdAt} format="date" /></b>
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

export default Staff
