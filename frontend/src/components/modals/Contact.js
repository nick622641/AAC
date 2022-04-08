import { Fragment, useState } from 'react'
import axios from 'axios'
import { FormControl, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ReCAPTCHA from 'react-google-recaptcha'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LoadingButton from '@mui/lab/LoadingButton'

function Contact() {

    const [ name,       setName       ] = useState('')
    const [ email,      setEmail      ] = useState('')
    const [ message,    setMessage    ] = useState('')
    const [ captcha,    setCaptcha    ] = useState(false)
    const [ success,    setSuccess    ] = useState(false)
    const [ loading,    setLoading    ] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()         
        setCaptcha(true)  
        setLoading(true)                
    }

    const onChange = (value) => {      
        
        const formData = new FormData()
        formData.set('name', name)
        formData.set('email', email)
        formData.set('message', message)   
        formData.set('key', value)           
        
        axios.post( '/api/v1/contact', formData )
            .then(res => {
                setSuccess(true)
                setLoading(false)
                setCaptcha(false)
            }).catch((res) => {
                setCaptcha(false)
                setLoading(false)
                console.log(res)
            })
                        
    }
    
    return (  

        <Fragment>

            {!captcha ? (

                !success ? (

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

                            <FormControl fullWidth>
                                <TextField
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    multiline
                                    rows={4}
                                    label="Message*"
                                    variant="standard"
                                />
                            </FormControl>    

                            <LoadingButton 
                                type="submit"
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"                            
                                endIcon={<SendIcon />}
                                sx={{ mt: 4, width: '100%' }}
                                disabled={ !name || !email || !message ? true : false }
                            >
                                Send Email
                            </LoadingButton>
                                
                        </form>     

                    </Fragment>

                ) : (

                    <Fragment>

                        <h2>Thank You!</h2>

                        <div className="text-center">

                            <CheckCircleIcon sx={{ fontSize:136, color: "var(--cta-green)" }} />

                        </div>                        

                        <p>We will get back to you shortly. You can now close this tab</p>

                    </Fragment>

                )               
                
            ) : (

                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    // sitekey={process.env.REACT_APP_RECAPTCHA_TEST_KEY}
                    onChange={onChange}
                /> 

            )}

        </Fragment>            

    )

}

export default Contact
