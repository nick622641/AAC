import React, { Fragment } from 'react'
import IconButton from '@mui/material/IconButton'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const Quantity = ({ quantity, stock, setQuantity  }) => {   

    const increaseQty = () => {        
        if(quantity >= stock) { return }
        setQuantity(quantity + 1)
    }
    const decreaseQty = () => {
        if(quantity <= 1) { return }
        setQuantity(quantity - 1)
    }  

  return (

    <Fragment>
      
        <IconButton className={quantity <= 1 ? 'inactive' : ''} onClick={decreaseQty}>
            <RemoveCircleIcon 
                fontSize="small" 
                color={quantity <= 1 ? 'disabled' : 'primary'}
            />
        </IconButton>

        <input
            className="count text-center"
            style={{ width: '40px' }}
            value={stock === 0 ? 0 : quantity} 
            readOnly 
        />

        <IconButton className={quantity === stock || stock <= 1 ? 'inactive' : ''} onClick={increaseQty}>
            <AddCircleIcon 
                fontSize="small" 
                color={quantity === stock || stock <= 1 ? 'disabled' : 'primary'}
            />
        </IconButton>
      
    </Fragment>

  )

}

export default Quantity
