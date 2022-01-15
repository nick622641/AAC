import { Fragment, useRef, useState } from "react"

function Contact() {

    const [ loading, setLoading ] = useState(false)

    const nameInputRef = useRef()
    const emailInputRef = useRef()
    const messageInputRef = useRef()

    function submitHandler(e) {
        e.preventDefault()
        setLoading(true)
        const enteredName = nameInputRef.current.value
        const enteredEmail = emailInputRef.current.value
        const enteredMessage = messageInputRef.current.value

        const contactData = {
            name: enteredName,
            email: enteredEmail,
            message: enteredMessage
        }
        console.log(contactData)
        setLoading(false)
        
    }
    
    return (  

        <Fragment>

            <h2>Contact Us</h2>

            <form onSubmit={submitHandler}>

                <table className="bordered-table">
                    <tbody>
                        <tr>
                            <th><h6>Name</h6></th>
                            <td>
                                <input 
                                    placeholder="Name" 
                                    ref={nameInputRef}
                                    required
                                    autoFocus 
                                />
                            </td>
                        </tr>
                        <tr>
                            <th><h6>Email</h6></th>
                            <td>
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    ref={emailInputRef}
                                    required
                                /> 
                            </td>
                        </tr>
                        <tr>
                            <th style={{ verticalAlign: "top" }}>
                                <h6 style={{ paddingTop: "12px" }}>Message</h6>
                            </th>
                            <td>
                                <textarea 
                                    rows="4" 
                                    ref={messageInputRef} 
                                    placeholder="Message" 
                                    required
                                /> 
                            </td>
                        </tr>
                        
                    </tbody>
                </table>   

                <br />

                <button 
                    className="submit"
                    disabled={loading === true ? true : false}
                >
                    {loading === true 
                        ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw" /> 
                        : 'Send'
                    }
                </button>
                    
            </form>     

        </Fragment>

    )
}

export default Contact
