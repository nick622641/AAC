import React from 'react'
import { Link } from 'react-router-dom'
import FormattedDate from '../layouts/FormattedDate'

const Painter = ({ painter }) => { 

    return (
        
        <Link to={`/painter/${painter.slug}`} className="showroom-item"> 

            <div> 

                <figure>
                    <img                      
                        src={painter.images[0].thumbUrl} 
                        alt={painter.name} 
                        className="object-fit"
                    /> 
                </figure>  
                
            </div> 

            <div>    

                <h6 
                    className="text-center"
                    style={{ marginTop: "20px" }}
                >
                    {painter.title}
                </h6> 

                <div className="text-center">

                    <p style={{ marginBottom: "10px" }}>
                        
                            <small>
                                By <b>{painter.name} </b>
                                on <b><FormattedDate iso={painter.createdAt} format="date" /></b>
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

export default Painter
