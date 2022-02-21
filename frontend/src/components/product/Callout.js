import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'

const Callout = ({ relatedProducts }) => {

    return (

        <div className="container">

            <div className="wrapper">

                <div className="parent reverse">

                    <Link to={`/artwork/${relatedProducts[0].slug}`}
                        className="col-6 no-font cta-first-image background-cover"
                        style={{ backgroundImage: `url(${relatedProducts[0].images[0].url})` }}
                    />
                    <div className="wrapper parent callout col-6">
                        <h3>{relatedProducts[0].artist}</h3>
                        <h2>{relatedProducts[0].name}</h2>
                        <p>
                            {relatedProducts[0].description.substring(0, 200)}...
                            <br />
                            <Link to={`/artwork/${relatedProducts[0].slug}`}>
                                <IconButton color="primary">
                                    <MenuBookOutlinedIcon />
                                </IconButton>
                            </Link>
                        </p>
                    </div>
 
                </div>

                <div className="parent">

                    <div className="col-6 relative">
                        <Link to={`/artwork/${relatedProducts[1].slug}`}
                            className="cta background-cover"
                            style={{ backgroundImage: `url(${relatedProducts[1].images[0].url})` }}
                        />
                    </div>
                    <Link to={`/artwork/${relatedProducts[2].slug}`}
                        className="col-6 cta-last-image background-cover"
                        style={{ backgroundImage: `url(${relatedProducts[2].images[0].url})` }}
                    />

                </div>  

            </div>

        </div>
            
    )

}

export default Callout
