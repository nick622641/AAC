import { Fragment, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { FormControl, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'

function Contact() {


    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ loading, setLoading ] = useState(false)

    function submitHandler(e) {

        e.preventDefault() 
        
        setLoading(true)

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
                              
                <FormControl fullWidth>
                    <TextField 
                        label="Name" 
                        value={name}
                        variant="standard"
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2 }}
                        required
                        autoFocus
                    />                                 
                </FormControl>
                       
                <FormControl fullWidth>
                    <TextField 
                        label="Email" 
                        name="email"
                        value={email}
                        variant="standard"
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 4 }}
                        required
                    />                                 
                </FormControl>                       
                        
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
                             
                <LoadingButton 
                    loading={loading}
                    loadingPosition="end"
                    variant="contained" 
                    onClick={submitHandler}
                    endIcon={<SendIcon />}
                    sx={{ mt: 4, width: '100%' }}
                >
                    Send
                </LoadingButton>
                    
            </form>     

        </Fragment>

    )

}

export default Contact
