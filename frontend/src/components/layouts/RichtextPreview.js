import React, { Fragment, useState } from 'react'
import Tooltip                       from '@mui/material/Tooltip'
import IconButton                    from '@mui/material/IconButton'
import VisibilityIcon                from '@mui/icons-material/Visibility'
import VisibilityOff                 from '@mui/icons-material/VisibilityOff'
import RichtextOutput                from './RichtextOutput'

const RichtextPreview = ({ text }) => {

    const [ previewVisible, setPreviewVisible ] = useState( false ) 

    return (

        <Fragment>

            <Tooltip title={ previewVisible ? 'Hide Preview' : 'Show Preview' } arrow> 
                <IconButton onClick={ () => setPreviewVisible(!previewVisible) }>
                    {previewVisible 
                        ? <VisibilityIcon fontSize="small" /> 
                        : <VisibilityOff  fontSize="small" />  
                    }                
                </IconButton>
            </Tooltip>

            {previewVisible && (

                <div className="rt-preview">
                    
                    <RichtextOutput text={text}  draft={true} />     

                </div>

            )}        

        </Fragment>

    )

}

export default RichtextPreview