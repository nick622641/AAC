import React, { Fragment, useState } from 'react'
// import React, { Fragment, useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Tooltip from '@mui/material/Tooltip'

const RichtextPreview = ({ text }) => {

    const [ previewVisible, setPreviewVisible ] = useState(false)       

    // const captionImages = () => {  

        // const imgs = document.querySelectorAll('.blog-content img')
        // const figures = document.querySelectorAll('.blog-content figure')

        // if(imgs.length > 0 && figures.length === 0) {
        //     for(let i = 0; i < imgs.length; i++) {
        //         imgs[i].setAttribute('title', imgs[i].alt)   
        //         const nextEl = imgs[i].nextElementSibling  
        //         const parent = imgs[i].parentNode
        //         const align = window.getComputedStyle(parent, null).textAlign
        //         parent.style.float = align === 'left' && 'left'
        //         parent.style.float = align === 'right' && 'right'            
        //         const figure = document.createElement("figure")               
        //         const figCap = document.createElement("figcaption") 
        //         figure.style.margin = align === 'right' && '0 0 10px 10px'
        //         figure.style.margin = align === 'left' && '0 10px 10px 0'
        //         figure.style.textAlign = align === 'right' && 'right'
        //         figure.style.textAlign = align === 'left' && 'left'    
        //         figCap.innerText = imgs[i].alt    
        //         figure.appendChild(imgs[i])    
        //         figure.appendChild(figCap)    
        //         parent.insertBefore(figure, nextEl)            
        //     }  
        // }        
                      
    // }

    // useEffect(() => {            
    //     captionImages()
    // }, [ text ])

  return (

    <Fragment>

        <Tooltip title={previewVisible ? 'Hide Preview' : 'Show Preview'} arrow>

            <IconButton onClick={() => { setPreviewVisible(!previewVisible)}}
            >
                {previewVisible 
                    ? <VisibilityIcon fontSize="small" /> 
                    : <VisibilityOff fontSize="small" />  
                }
                
            </IconButton>

        </Tooltip>

        {previewVisible && (

            <div className="rt-preview">

                <div className="blog-content"
                    dangerouslySetInnerHTML={{ 
                        __html: text || 'Preview'
                    }} 
                />
                    
                <div style={{ clear: "both" }} />

            </div>

        )}        

    </Fragment>

  )

}

export default RichtextPreview