import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'

const Carousel = ({ data }) => {

    const [ imgIndex, setImgIndex ] = useState(0)     
    const [ left,     setLeft     ] = useState(0)

    const moveLeft  = () => { 
        const item = document.querySelector('.carousel li')
        const width = item.offsetWidth * -1 
        setImgIndex(imgIndex - 1) 
        setLeft(width * (imgIndex - 1))
    }
    const moveRight = () => { 
        const item = document.querySelector('.carousel li')
        const width = item.offsetWidth * -1 
        setImgIndex(imgIndex + 1) 
        setLeft(width * (imgIndex + 1))
    } 

    return (

        <div className="container">
            <div className="wrapper" style={{ position: "relative" }}>
                <div className="carousel">
                    <ul style={{ left: `${left}px` }}>    

                        {data && data.map((slide, index) => (
                            <li 
                                key={index}
                                className={index === (imgIndex + 1) ? 'active' : ''}
                            >
                                <img 
                                    src={slide.url} 
                                    className="centered-image"
                                    alt="" 
                                />
                            </li>
                        ))}                              
                    </ul>
                </div>
                <div className="arrow-buttons">
                
                    <IconButton onClick={moveLeft}>
                        <ArrowBackIosOutlinedIcon 
                            style={{ display: imgIndex === 0 && "none" }}
                        />
                    </IconButton>     

                    <IconButton className="float-r" onClick={moveRight}>
                        <ArrowForwardIosOutlinedIcon 
                            style={{ display: imgIndex === 6 && "none" }}
                        />
                    </IconButton>

                </div>
            </div>
            <div className="wrapper">
                <div className="text-center">
                    <h2>Image Title</h2>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,</p>
                </div>
            </div>
        </div> 

    )

}

export default Carousel