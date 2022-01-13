import React, { Fragment } from 'react'

const Confirm = (props) => {

    return (

        <Fragment>

            <h3>{props.message}?</h3>

            <div className="buttons">

                <button 
                    className="confirm"
                    onClick={() => {
                        props.onConfirm()
                        props.onBackdropClick()
                    }}
                >
                    OK
                </button>

                &nbsp; &nbsp;

                <button 
                    className="cancel"
                    onClick={props.onBackdropClick}
                >
                    Cancel
                </button>

            </div>
            
        </Fragment>

    )

}

export default Confirm
