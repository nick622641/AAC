import React, { Fragment, useState } from 'react'
import ReactDOM from 'react-dom'
import { animated } from 'react-spring'

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

            <div className="backdrop" />

            <div className="lightbox-stage">

            <animated.div style={props.slideTopAnimation} className="lightbox">

                <div 
                    className="slide-container"
                    style={{ left: `${left}px` }}
                > 

                    {props.product.images && props.product.images.map((image, index) => (

                        <div key={index}>
                            <img                         
                                src={image.url} 
                                alt={props.product.name} 
                                className={props.product.width > props.product.height ? 'landscape' : 'portrait'}
                            />
                        </div>

                    ))}    

                </div>                

            </animated.div> 

            <div className="arrow-buttons">
                    <i 
                        className={imgIndex > 0 ? 'fa fa-chevron-left' : ''} 
                        onClick={moveLeft}
                    />
                    <i 
                        className={imgIndex < (props.product.images.length - 1) ? 'fa fa-chevron-right' : ''}
                        onClick={moveRight}
                    />
                </div>
                <i className="fa fa-times" onClick={props.toggleLightbox}></i>

            </div>

        </Fragment>,

        document.getElementById('modal-root')         

    )

}

export default Lightbox
