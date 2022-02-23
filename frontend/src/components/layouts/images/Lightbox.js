import React, { Fragment, useState } from 'react'
import ReactDOM from 'react-dom'
import { animated } from 'react-spring'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import './lightbox.css'

const Lightbox = (props) => { 

    const width = (window.innerWidth / 100) * -90
    const [ imgIndex, setImgIndex ] = useState(props.imgIndex)     
    const [ left,     setLeft     ] = useState(width * props.imgIndex)
    
    const moveLeft  = () => { 
        setImgIndex(imgIndex - 1) 
        setLeft(width * (imgIndex - 1))
    }
    const moveRight = () => { 
        setImgIndex(imgIndex + 1) 
        setLeft(width * (imgIndex + 1))
    } 

    return ReactDOM.createPortal(
      
        <Fragment>

            <div className="backdrop">

            <animated.div style={props.slideTopAnimation} className="lightbox">

                <div className="slide-container" style={{ left: `${left}px` }}> 

                    {props.product.images && props.product.images.map((image, index) => (

                        <div key={index}>
                            <img                         
                                src={image.url} 
                                alt={props.product.name} 
                                className="object-fit"
                            />
                        </div>

                    ))}    

                </div>                

            </animated.div> 

            <div className="arrow-buttons">
         
                <IconButton 
                    onClick={moveLeft}
                    style={{ display: imgIndex === 0 && "none" }}
                    sx={{ color: "#999999" }}
                >
                    <ArrowBackIosOutlinedIcon />
                </IconButton>     

                <IconButton 
                    className="float-r"
                    onClick={moveRight}
                    style={{ display: imgIndex === (props.product.images.length - 1) && "none" }}
                    sx={{ color: "#999999" }}
                >
                    <ArrowForwardIosOutlinedIcon />
                </IconButton>

            </div>

            <IconButton 
                className="close" 
                onClick={props.toggleLightbox}  
                sx={{ backgroundColor: "transparent", color: "#999999",position: 'absolute', top: 10, right: 10 }}              
            >
                <CloseIcon />
            </IconButton>
            </div>

        </Fragment>,

        document.getElementById('modal-root')         

    )

}

export default Lightbox
