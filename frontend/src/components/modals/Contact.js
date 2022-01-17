import { Fragment, useState } from 'react'
import RichText from '../layouts/RichText'

function Contact() {


    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ message, setMessage ] = useState('')

    function submitHandler(e) {

        e.preventDefault()       

        const formData = new FormData()

        formData.set('name', name)
        formData.set('email', email)
        formData.set('message', message)

        console.log(`Name: ${name}, Email: ${email} and message: ${message}`)
        
    }
    
    return (  

        <Fragment>

            <h2>Contact Us</h2>

            <form onSubmit={submitHandler}>

                <table className="bordered-table fixed-table">
                    <tbody>
                        <tr>
                            <th style={{ width: "100px" }}><h6>Name</h6></th>
                            <td>
                                <input 
                                    placeholder="Name" 
                                    onChange={(e) => setName(e.target.value)}
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                /> 
                            </td>
                        </tr>
                        <tr>
                            <th style={{ verticalAlign: "top" }}>
                                <h6 style={{ paddingTop: "12px" }}>Message</h6>
                            </th>
                            <td>                              
                                <div className="relative">
                                    <RichText
                                        text={message}
                                        setText={setMessage}
                                    />
                                    <input 
                                        className="hidden-input" 
                                        value={message ? message : ''} 
                                        onChange={(e) => setMessage(e.target.value)} 
                                        required
                                    />
                                </div>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>   

                <br />
                <br />

                <button className="submit">Send</button>
                    
            </form>     

        </Fragment>

    )
}

export default Contact
