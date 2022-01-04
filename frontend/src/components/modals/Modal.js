import { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { useSpring, animated } from 'react-spring'

function Modal(props) {

    const animation = useSpring({     
      opacity: props.isModalVisible ? 1 : 0,
      transform: props.isModalVisible ? `translateY(-50%)` : `translateY(-100%)`
    })
  
    if(!props.isModalVisible) {
      return null
    }

    return ReactDOM.createPortal( 

      <Fragment>

       <div className='backdrop' onClick={props.onBackdropClick} />

        <animated.div style={animation} className="modal user-form">                    

          {props.content}

          <i className="fa fa-times" onClick={props.onBackdropClick}/>

        </animated.div>

      </Fragment>,

      document.getElementById('modal-root')
    
    )

}

export default Modal
