import { Fragment, useState } from 'react'
import ReactDOM from 'react-dom'
import { useSpring, animated } from 'react-spring'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Backdrop from '@mui/material/Backdrop'

function Modal({ isModalVisible, content, onBackdropClick  }) {

  const [open] = useState(true)

    const animation = useSpring({     
      opacity: isModalVisible ? 1 : 0,
      transform: isModalVisible ? `translateY(-50%)` : `translateY(-100%)`
    })
  
    if(!isModalVisible) {
      return null
    }

    return ReactDOM.createPortal( 

      <Fragment>

        <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={onBackdropClick}
        />

        <animated.div style={animation} className="modal user-form">                    

          {content}

          <Fab 
            size="small" 
            onClick={onBackdropClick}  
            color="primary"
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon />
          </Fab>

        </animated.div>

      </Fragment>,

      document.getElementById('modal-root')
    
    )

}

export default Modal
