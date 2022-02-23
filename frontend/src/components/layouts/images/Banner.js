import React from 'react'
import { Link } from 'react-router-dom'
import RichtextOutput from '../richtext/RichtextOutput'
import './banner.css'

const Banner = ({ product }) => {

  return (

    <section 
        style={{ backgroundImage: `url(${product.images[0].url})` }}
        className="background-cover"
    >
        <div className="wrapper banner parent">
            <h3>{product.artist}</h3>
            <h2>{product.name}</h2>
            <div style={{ marginBottom: "40px", fontSize: "14px" }}>
              <RichtextOutput text={`${product.description.substring(0, 155)}...`} />
            </div>

            <Link className="submit chevron-hover" to={`/artwork/${product.slug}`}>
                Explore
            </Link>
        </div>
    </section>
  )

}

export default Banner