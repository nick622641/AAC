import React from 'react'
import { Link } from 'react-router-dom'
import FormattedPrice from '../layouts/FormattedPrice'

const Product = ({ product }) => {

    return (
        
        <Link to={`/artwork/${product.slug}`} className="showroom-item"> 

            <div> 

                <figure>
                    <img                      
                        src={product.images[0].thumbUrl} 
                        alt={product.name} 
                        className="object-fit"
                    /> 
                </figure>  
                
            </div> 

            <div>    

                <h6 
                    className="text-center"
                    style={{ marginTop: "20px" }}
                >
                    {product.name}
                </h6> 

                <div className="text-center">

                    <p style={{ marginBottom: "10px" }}>
                        <b>
                            <small>{product.artist}</small>
                        </b>
                    </p>  
                    
                    <span className="primary-color" style={{ fontSize: "22px" }}>
                        {product.stock > 0 
                            ? <FormattedPrice number={product.price} /> 
                            : 'Sold'
                        }                    
                    </span> 

                </div>                        
                                       
            </div>

        </Link>

    )

}

export default Product
