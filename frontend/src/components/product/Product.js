import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    return (
        <Link to={`/artwork/${product._id}`} className="showroom-item"> 

            <figure> 
                <span>
                <img 
                    className={product.width >= product.height? 'landscape' : 'portrait'}
                    src={product.images[0].thumbUrl} 
                    alt={product.name} 
                /> 
                </span>  
            </figure> 
            <div>       
                <h6>{product.name}</h6> 
                        
                <small>{product.artist}</small>  
                
                <span>${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} CAN</span>                        
            </div>

        </Link>
    )
}

export default Product
