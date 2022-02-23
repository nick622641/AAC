import React from 'react'
import { Link } from 'react-router-dom'
import RichtextOutput from '../richtext/RichtextOutput'
import './banner.css'

const Banner = ({ product }) => {

  return (

    <section 
        style={{ backgroundImage: `url(${product[0].images[0].url})` }}
        className="background-cover"
    >
        <div className="wrapper banner parent">
            <h3>{product[0].artist}</h3>
            <h2>{product[0].name}</h2>
            <div>
              <RichtextOutput text={`${product[0].description.substring(0, 155)}...`} />
            </div>

            <Link className="submit chevron-hover" to={`/artwork/${product[0].slug}`}>
                Explore
            </Link>
        </div>
    </section>
  )

}

export default Banner