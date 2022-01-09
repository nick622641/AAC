import React, { Fragment, useState } from 'react'
import { countries } from 'countries-list'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions'
import { useNavigate, Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'

const Shipping = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const countriesList = Object.values(countries)
    const { shippingInfo } = useSelector( state => state.cart )    
    const [ address, setAddress       ] = useState(shippingInfo.address)
    const [ city, setCity             ] = useState(shippingInfo.city)
    const [ postalCode, setPostalCode ] = useState(shippingInfo.postalCode)
    const [ phoneNo, setPhoneNo       ] = useState(shippingInfo.phoneNo)
    const [ country, setCountry       ] = useState(shippingInfo.country)    

    const submitHandler = (e) => {
        e.preventDefault()
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
                                    <h6>Code</h6>
                                </th>
                                <td>
                                    <input
                                        placeholder="Postal Code"
                                        value={postalCode ? postalCode : ''}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <h6>Country</h6>
                                </th>
                                <td>
                                    <select
                                        value={country ? country : ''}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                    >
                                        <option>Country</option>
                                        {countriesList.map(country => (
                                            <option key={country.name} value={country.name}>
                                                {country.name}
                                            </option>
                                        ))}  
                                    </select>
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
