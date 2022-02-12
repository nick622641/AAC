import React from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const DragnDrop = ({ setIsModalVisible, setImageIndex, setImageId, setInit, setFinal, updateImagesHandler, productId, init, final, oldImages, imagesPreview }) => {

    const dragStartHandler = (el) => {
        const container = document.querySelector('.dragContainer')
        el.classList.add('dragging')
        for (let i = 0; i < container.children.length; i++) {
            if (container.children[i].classList.contains('dragging')) {
                setInit(i)
            }            
        }         
    }
    const dragEndHandler = (el) => {
        el.classList.remove('dragging')
        updateImagesHandler(productId, init, final)  
    }
    const handleContainerDrag = (e) => {
        
        e.preventDefault()
        const container = document.querySelector('.dragContainer')
        const draggable = document.querySelector('.dragging')
        const afterElement = getDragAfterElement(e.clientX)
        for (let i = 0; i < container.children.length; i++) {
            if (container.children[i].classList.contains('dragging')) {
                setFinal(i)
            }            
        }        
        if (afterElement === null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        } 
    }

    const getDragAfterElement = (x) => {
        const container = document.querySelector('.dragContainer')
        const draggableElements = [ ...container.querySelectorAll('.draggable:not(.dragging)')]

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = x - box.left - box.width / 2
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest 
            }

        }, {offset: Number.NEGATIVE_INFINITY}).element
    }

    return (

        <ul onDragOver={handleContainerDrag} className="dragContainer d-flex">                          
                                       
            {oldImages && oldImages.map((img, i) => (                                                                                      
                
                <li 
                    key={img._id} 
                    className="relative draggable round background-cover" 
                    draggable="true"
                    onDragStart={(e) => dragStartHandler(e.target)}
                    onDragEnd={(e) => dragEndHandler(e.target)}
                    style={{ marginRight: '10px', width: '40px', height: '40px', backgroundImage: `url(${img.thumbUrl})` }}
                > 
                    {i !== 0 && (
                        <IconButton 
                            onClick={() => {
                                setIsModalVisible(true)   
                                setImageIndex(i)  
                                setImageId(img._id)                                               
                            }}
                            sx={{ position: 'absolute', top: 0, right: 0 }}                                                
                        >
                            <DeleteOutlineIcon sx={{ color: '#ccc' }} />
                        </IconButton> 
                    )}   
                                       
                </li>                                           
            ))}

            {imagesPreview.map((img, i) => (                                           
                <li 
                    key={i} 
                    className="relative round background-cover" 
                    style={{ marginRight: '10px', width: '40px', height: '40px', backgroundImage: `url(${img})` }}
                />                                           
            ))}
        </ul> 

    )

}

export default DragnDrop
