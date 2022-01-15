import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions'
import { useNavigate, Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'
import Countries from '../layouts/Countries'

const Shipping = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { shippingInfo } = useSelector( state => state.cart )    
    const [ address,      setAddress    ] = useState(shippingInfo.address)
    const [ city,         setCity       ] = useState(shippingInfo.city)
    const [ postalCode,   setPostalCode ] = useState(shippingInfo.postalCode)
    const [ phoneNo,      setPhoneNo    ] = useState(shippingInfo.phoneNo)
    const [ country,      setCountry    ] = useState(shippingInfo.country)    
    const [ isSelectOpen, setSelectOpen ] = useState(false)   

    const submitHandler = (e) => {
        e.preventDefault()
        if ( !country ) return
        dispatch(saveShippingInfo( { address, city, postalCode, phoneNo, country } ))
        navigate('/order/confirm')
    }

    return (

        <Fragment>

            <MetaData title={'Shipping Info'} />                     

            <div className="container">                        

                <div className="wrapper stage">  

                    <form className="user-form" onSubmit={submitHandler}>

                        <CheckoutSteps shipping /> 

                        <table className="bordered-table">
                        <tbody>
                            <tr>
                                <th>
                                    <h6>Address</h6>
                                </th>
                                <td>
                                    <input
                                        placeholder="Address"
                                        value={address ? address : ''}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <h6>City</h6>
                                </th>
                                <td>
                                    <input
                                        placeholder="City"
                                        value={city ? city : ''}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <h6>Phone</h6>
                                </th>
                                <td>
                                    <input
                                        placeholder="Telephone number"
                                        value={phoneNo ? phoneNo : ''}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <h6>Post Code</h6>
                                </th>
                                <td>
                                    <input
                                        placeholder="Postal Code"
                                        value={postalCode ? postalCode : ''}
                                        onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                                        required
                                    />
                                </td>
                            </tr>                            
                            <tr>
                                <th>
                                    <h6>Country</h6>
                                </th>
                                <td className="relative">
                                    <Countries
                                        country={country}
                                        setCountry={setCountry}
                                        setSelectOpen={setSelectOpen}
                                        isSelectOpen={isSelectOpen}
                                    /> 
                                     <input className="hidden-input" value={country ? country : ''} onChange={(e) => setCountry(e.target.value.toUpperCase())} required/>                                  
                                </td>
                            </tr>
                        </tbody>
                        </table> 

                        <br />  
                    
                        <button className="submit">Continue</button>

                        <Link to="/cart"><i className="fa fa-times" /></Link>

                    </form>

                </div>

            </div>                     

        </Fragment>

    )
}

export default Shipping
