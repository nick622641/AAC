import React from 'react'
import { Link } from 'react-router-dom'
import FormattedPrice from '../layouts/FormattedPrice'

const Product = ({ product }) => {

    return (
        
        <Link to={`/artwork/${product._id}`} className="showroom-item"> 

            <div> 

                <figure>
                    <img                      
                        src={product.images[0].thumbUrl} 
                        alt={product.name} 
                    /> 
                </figure>  
                
            </div> 

            <div>    

                <h6 className="text-center">{product.name}</h6> 

                <div className="text-center">

                    <p><b><small>{product.artist}</small></b></p>  
                    
                    <span>
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
