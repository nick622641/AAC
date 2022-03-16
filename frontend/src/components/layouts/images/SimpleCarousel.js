import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import './carousel.css'

const Carousel = ({ data, name }) => {

    const [ imgIndex,   setImgIndex   ] = useState(0)     
    const [ left,       setLeft       ] = useState('calc(-100% / 3')
    const [ imageArray, setImageArray ] = useState([])

    const cloneData = (data) => {
        let array = []
        array.push(data[data.length - 2])
        array.push(data[data.length - 1])
        data.forEach((d) => {            
            array.push(d)
        })          
        array.push(data[0])
        array.push(data[1])
        setImageArray(array)
    }

    useEffect(() => {         
      cloneData(data)
    }, [ data ])    

    const handleMove = ( dir ) => {
        const item      = document.querySelector( '.carousel li' )
        const slides    = document.querySelectorAll('.transition')
        const width     = item.offsetWidth * -1         
        if ( dir === 'left' ) {
            setImgIndex( imgIndex - 1 )
            setLeft    ( ( imgIndex  * width ) + 'px' )
            if ( imgIndex === 0 ) {
                setTimeout(() => {
                    resetClasses(slides, false)  

                    setImgIndex( data.length - 1 )
                    setLeft    ( ( data.length * width ) + 'px' )

                    setTimeout(() => {
                        resetClasses(slides, true)
                    }, 50)   
                }, 500) 
            }
        } else {
            setImgIndex( imgIndex + 1 )
            setLeft    ( ( imgIndex + 2 ) * width + 'px' )
            if ( imgIndex === (data.length - 1) ) {  
                setTimeout(() => {
                    resetClasses(slides, false)                  
                    setImgIndex( 0 )
                    setLeft    ( 'calc(-100% / 3' )
                    setTimeout(() => {
                        resetClasses(slides, true)
                    }, 50)   
                }, 500)  
            }            
        }       
    }
    const resetClasses = (elements, add) => {
        for ( let i = 0; i < elements.length; i++ ) {
            if ( add === true ) {
                elements[i].classList.add('transition')  
            } else {
                elements[i].classList.remove('transition') 
            }                                  
        }
    }

    return (

        <div className="container">
            <div className="wrapper relative">
                <div className="carousel">
                    <ul style={{ left: left }} className="transition">    

                        {imageArray && imageArray.map((slide, index) => (
                            <li 
                                key={index}
                                className={index === (imgIndex + 2) ? 'active' : ''}
                            >
                                <img 
                                    src={slide.thumbUrl} 
                                    className="centered-image"
                                    alt={name} 
                                />
                            </li>
                        ))}                              
                    </ul>
                </div>
                <div className="arrow-buttons">
                
                    <IconButton onClick={() => handleMove('left')}>
                        <ArrowBackIosOutlinedIcon />
                    </IconButton>     

                    <IconButton onClick={() => handleMove('right')} className="float-r">
                        <ArrowForwardIosOutlinedIcon />
                    </IconButton>

                </div>
            </div>           
        </div> 

    )

}

export default Carousel