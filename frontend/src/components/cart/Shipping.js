import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { FormControl, InputLabel, MenuItem, TextField, Select, Button } from '@mui/material'
import { saveShippingInfo } from '../../actions/cartActions'
import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import countryList from '../layouts/countryList'

const Shipping = () => {    

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const countriesList = Object.values( countryList )

    const { shippingInfo } = useSelector( state => state.cart )   

    const [ address,    setAddress    ] = useState( shippingInfo.address    || '' )
    const [ city,       setCity       ] = useState( shippingInfo.city       || '' )
    const [ postalCode, setPostalCode ] = useState( shippingInfo.postalCode || '' )
    const [ phoneNo,    setPhoneNo    ] = useState( shippingInfo.phoneNo    || '' )
    const [ country,    setCountry    ] = useState( shippingInfo.country    || '' )    

    const submitHandler = (e) => {

        e.preventDefault()

        dispatch(saveShippingInfo( { address, city, postalCode, phoneNo, country } ))

        navigate('/order/confirm')
        
    }

    return (

        <Fragment>

            <MetaData title={'Shipping Info'} noIndex={true} />                     

            <div className="container">                        

                <div className="wrapper d-flex">  

                    <form className="user-form" onSubmit={submitHandler}>

                        <CheckoutSteps shipping /> 

                        <FormControl fullWidth>
                            <TextField 
                                label="Address" 
                                value={address}
                                variant="standard"
                                onChange={(e) => setAddress(e.target.value)}
                                sx={{ mb: 2 }}
                                required
                            />                      
                            <TextField 
                                label="City" 
                                value={city}
                                variant="standard"
                                onChange={(e) => setCity(e.target.value)}
                                sx={{ mb: 2 }}
                                required
                            />
                            <TextField 
                                label="Telephone number" 
                                value={phoneNo}
                                variant="standard"
                                onChange={(e) => setPhoneNo(e.target.value)}
                                sx={{ mb: 2 }}
                                required
                            />
                            <TextField 
                                label="Postal Code" 
                                value={postalCode}
                                variant="standard"
                                onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                                sx={{ mb: 2 }}
                                required
                            />                           
                        </FormControl>
                        <FormControl variant="standard" fullWidth required>
                            <InputLabel>Country</InputLabel>
                            <Select 
                                label="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)} 
                                sx={{ mb: 4 }}
                            >
                                {countriesList.map(c => (                                
                                    <MenuItem key={c.name} value={c.name}>         
                                        <img
                                            alt={c.name} 
                                            src={`https://flagcdn.com/${c.code.toLowerCase()}.svg`}
                                            style={{ width: '20px', marginRight: '10px' }}
                                        />                                    
                                        {c.name} 
                                    </MenuItem>                                                
                                ))} 
                            </Select>
                        </FormControl>                      

                        <Button 
                            variant="contained" 
                            type="submit" 
                            endIcon={<SendIcon />}
                            sx={{ width: '100%' }}
                        >
                            Continue
                        </Button>

                        <Link to="/cart">                              
                            <Fab 
                                size="small" 
                                color="primary"
                                sx={{ position: 'absolute', top: 10, right: 10 }}
                            >
                                <CloseIcon />
                            </Fab>
                        </Link>                           

                    </form>

                </div>

            </div>                     

        </Fragment>

    )

}

export default Shipping
