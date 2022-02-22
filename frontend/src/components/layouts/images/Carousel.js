import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import RichtextOutput from '../richtext/RichtextOutput'

const Carousel = ({ data }) => {

    const [ imgIndex, setImgIndex ] = useState(0)     
    const [ left,     setLeft     ] = useState(0)
    const [ textleft, setTextLeft ] = useState( '-100%' )

    const handleMove = (dir) => {
        const item      = document.querySelector( '.carousel li' )
        const text      = document.querySelector( '.carousel-text li' )
        const width     = item.offsetWidth * -1         
        const textwidth = text.offsetWidth * -1 
        setImgIndex  ( dir === 'left' ?   imgIndex - 1 
                                      :   imgIndex + 1 
        ) 
        setLeft      ( dir === 'left' ? ( imgIndex - 1 ) * width 
                                      : ( imgIndex + 1 ) * width 
        )
        setTextLeft  ( dir === 'left' ? ( imgIndex       * textwidth ) + 'px' 
                                      : ( imgIndex + 2 ) * textwidth   + 'px' 
        )
    }

    return (

        <div className="container">
            <div className="wrapper relative">
                <div className="carousel">
                    <ul style={{ left: `${left}px` }}>    

                        {data && data.map((slide, index) => (
                            <li 
                                key={index}
                                className={index === (imgIndex + 1) ? 'active' : ''}
                            >
                                <Link to={`artwork/${slide.slug}`}>
                                    <img 
                                        src={slide.images[0].url} 
                                        className="centered-image"
                                        alt={slide.name} 
                                    />
                                </Link>
                            </li>
                        ))}                              
                    </ul>
                </div>
                <div className="arrow-buttons">
                
                    <IconButton onClick={() => handleMove('left')}>
                        <ArrowBackIosOutlinedIcon 
                            style={{ display: imgIndex === 0 && "none" }}
                        />
                    </IconButton>     

                    <IconButton onClick={() => handleMove('right')} className="float-r">
                        <ArrowForwardIosOutlinedIcon 
                            style={{ display: imgIndex === (data.length - 3) && "none" }}
                        />
                    </IconButton>

                </div>
            </div>
            <div className="wrapper relative">
                <div className="carousel-text">
                    <ul style={{ left: textleft }}> 
                        {data && data.map((slide, index) => (
                            <li key={index} className="text-center">
                                <Link to={`artwork/${slide.slug}`}>
                                    <h2>{slide.name}</h2>
                                    <RichtextOutput text={slide.description} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div> 

    )

}

export default Carousel