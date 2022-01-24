import { Fragment, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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

                <table className="top-align" style={{ tableLayout: 'fixed' }}>
                    <tbody>
                        <tr>
                            <th style={{ width: "100px" }} className="text-right">Name</th>
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
                            <th className="text-right">Email</th>
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
                            <th className="text-right">
                                Message
                            </th>
                            <td>                              
                                <div className="relative">
                                    <CKEditor
                                        editor={ClassicEditor}               
                                        data={message}
                                        onChange={(event, editor) => {
                                            const data = editor.getData()
                                            setMessage(data)
                                        }}
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
