import React from 'react'
import { Link } from 'react-router-dom'

const Callout = ({ products }) => {

    return (

        <div className="container">

            <div className="wrapper">

                <div className="parent reverse">

                    <Link to={`/artwork/${products[0]._id}`}
                        className="col-6 no-font cta-first-image background-cover"
                        style={{ backgroundImage: `url(${products[0].images[0].url})` }}
                    />
                    <div className="wrapper parent callout col-6">
                        <h3>{products[0].artist}</h3>
                        <h2>{products[0].name}</h2>
                        <p>
                            {products[0].description.substring(0, 200)}...
                            <Link to={`/artwork/${products[0]._id}`}>
                            <i className="fa fa-book" />
                            </Link>
                        </p>
                    </div>

                </div>

                <div className="parent">

                    <div className="col-6 relative">
                        <Link to={`/artwork/${products[1]._id}`}
                            className="cta background-cover"
                            style={{ backgroundImage: `url(${products[1].images[0].url})` }}
                        />
                    </div>
                    <Link to={`/artwork/${products[2]._id}`}
                        className="col-6 cta-last-image background-cover"
                        style={{ backgroundImage: `url(${products[2].images[0].url})` }}
                    />

                </div>  

            </div>

        </div>
            
    )

}

export default Callout
