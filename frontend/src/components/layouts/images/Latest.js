import React from 'react'
import { Link } from 'react-router-dom'
import './latest.css'

const Latest = ({ product }) => {     

    return (

        <div className="parent align-items-center">
            <div className="col-6">
                <img src={product.images[0].url} alt={product.name} />
            </div>
            <div className="parent col-6 wrapper callout">
                <h3>BROWSE THE COLLECTION</h3>

                <h2>Latest Work</h2>

                <p>Striking and affordable original works of abstract art by global artists. Inspired in Canada, driven by emotion and powered by colour and texture.</p>
                
                <br />

                <Link className="submit chevron-hover" to={`/artwork/${product.slug}`}>
                    Shop Now 
                </Link>
            </div>
        </div>     

    )

}

export default Latest