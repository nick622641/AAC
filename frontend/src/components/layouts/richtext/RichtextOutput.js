import React, { Fragment, useEffect } from 'react'
import parse from 'html-react-parser'

const RichtextOutput = ( { text, draft = false } ) => {

    const captionImages = () => {   
        
        const imgs    = document.querySelectorAll('.blog-content img')
        const figures = document.querySelectorAll('.blog-content figure')

        if ( imgs.length > 0 && figures.length === 0 ) {

            for(let i = 0; i < imgs.length; i++) {                               
                const nextEl     = imgs[i].nextElementSibling  
                const parent     = imgs[i].parentNode 
                const figure     = document.createElement('figure')               
                const figCap     = document.createElement('figcaption')   
                const align      = window.getComputedStyle(parent, null).textAlign             
                figCap.innerText = imgs[i].alt    
                figure.appendChild(imgs[i])    
                figure.appendChild(figCap)   
                parent.insertBefore(figure, nextEl)   
                imgs[i].setAttribute('title', imgs[i].alt)                   
                parent.style.float     = align === 'left'  && 'left'
                parent.style.float     = align === 'right' && 'right' 
                figure.style.margin    = align === 'right' && '0 0 0 10px'
                figure.style.margin    = align === 'left'  && '0 10px 0 0'
                figure.style.textAlign = align === 'right' && 'right'
                figure.style.textAlign = align === 'left'  && 'left'                       
            } 

        }
               
    }

    useEffect(() => {
      captionImages()
    }, [ text ])

    return (

        <Fragment>

            {draft === true 
                ? <div className="blog-content" dangerouslySetInnerHTML={{ __html: text }} />
                : <div className="blog-content">{parse(text)}</div>
            }  
                
            <div style={{ clear: 'both' }} />

        </Fragment>

    )

}

export default RichtextOutput