import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import RichtextOutput from '../richtext/RichtextOutput'
import './callout.css'

const Callout = ({ data }) => {   
    
    return (

        <div className="container">

            <div className="wrapper callout">

                <div className="parent reverse">

                    <Link to={`/artwork/${data[0].slug}`}
                        className="col-6 no-font cta-first-image background-cover"
                        style={{ backgroundImage: `url(${data[0].images[0].url})` }}
                    />
                    <div className="wrapper col-6">
                        <h3>{data[0].artist}</h3>
                        <h2>{data[0].name}</h2>
                        <div>
                            <RichtextOutput text={`${data[0].description.substring(0, 200)}...`} />                            
                            <br />
                            <Link to={`/artwork/${data[0].slug}`}>
                                <IconButton color="primary">
                                    <MenuBookOutlinedIcon />
                                </IconButton>
                            </Link>
                        </div>
                    </div>
 
                </div>

                <div className="parent">

                    <div className="col-6 relative">
                        <Link to={`/artwork/${data[1].slug}`}
                            className="cta background-cover"
                            style={{ backgroundImage: `url(${data[1].images[0].url})` }}
                        />
                    </div>
                    <Link to={`/artwork/${data[2].slug}`}
                        className="col-6 cta-last-image background-cover"
                        style={{ backgroundImage: `url(${data[2].images[0].url})` }}
                    />

                </div>  

            </div>

        </div>
            
    )

}

export default Callout
