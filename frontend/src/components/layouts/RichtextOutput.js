import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'

const RichtextOutput = ( { text } ) => {

    const { loading } = useSelector( state => state.blogDetails )

    const captionImages = (imgs) => {     
        for(let i = 0; i < imgs.length; i++) {
            imgs[i].setAttribute('title', imgs[i].alt)   
            const nextEl = imgs[i].nextElementSibling  
            const parent = imgs[i].parentNode
            const figure = document.createElement("figure")               
            const figCap = document.createElement("figcaption") 
            figCap.innerText = imgs[i].alt    
            figure.appendChild(imgs[i])    
            figure.appendChild(figCap)   
            parent.insertBefore(figure, nextEl)   
            const align = window.getComputedStyle(parent, null).textAlign
            parent.style.float = align === 'left' && 'left'
            parent.style.float = align === 'right' && 'right' 
            figure.style.margin = align === 'right' && '0 0 0 10px'
            figure.style.margin = align === 'left' && '0 10px 0 0'
            figure.style.textAlign = align === 'right' && 'right'
            figure.style.textAlign = align === 'left' && 'left'                       
        }        
    }

    useEffect(() => {
        if(!loading) {
            const imgs = document.querySelectorAll('.blog-content img')
            const figures = document.querySelectorAll('.blog-content figure')
            if(imgs.length > 0 && figures.length === 0) {
                captionImages(imgs)
            }            
        } 
    }, [loading])

    return (

        <Fragment>

            <div className="blog-content">
                {parse(text)}
            </div>
                
            <div style={{ clear: "both", marginBottom: "40px" }} />

        </Fragment>

    )

}

export default RichtextOutput