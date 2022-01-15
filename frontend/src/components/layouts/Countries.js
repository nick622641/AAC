import React, { Fragment, useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import countryList from './countryList'

const Countries = ({ country, setCountry, setSelectOpen, isSelectOpen }) => {

    const countriesList = Object.values(countryList)
    const [ flagIcon, seFlagIcon ] = useState('')

    const selectAppear = useSpring({
        transform: isSelectOpen ? "translateY(0)" : "translateY(40px)",
        opacity: isSelectOpen ? 1 : 0
    })

    const filterFunction = () => {      
        const filter = document.querySelector(".custom-select input").value.toUpperCase()
        const li = document.querySelectorAll(".custom-select-dropdown .list-item")
        for (let i = 0; i < li.length; i++) {
            const txtValue = li[i].textContent           
            li[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none"
        }
    }

    useEffect(() => {
        for ( let i = 0; i < countriesList.length; i++ ) {
            if ( countriesList[i].name === country ) {
                seFlagIcon(`https://flagcdn.com/${countriesList[i].code.toLowerCase()}.svg`)
            }
        }        
    }, [countriesList, country])    

    return (

        <Fragment>

        {isSelectOpen && (
            <div 
                className="backdrop clear" 
                onClick={() => setSelectOpen(false)}                 
            />
        )}   

        <ul className="custom-select">
            <li className={isSelectOpen ? 'open' : ''}>
                <div 
                    onClick={() => setSelectOpen(!isSelectOpen)}
                    
                >   
                    {country && <img src={flagIcon}  alt={country} />}                
                    <span className={country ? 'set' : ''}>
                        {country ?  country : 'Country'}
                    </span> 
                    <i className={`fa fa-chevron-${isSelectOpen ? "up" : "down"} float-r`} />
                </div>

                {isSelectOpen && (
                    <animated.div 
                        className="custom-select-dropdown"
                        style={selectAppear}
                    >                      
                        <label className="sticky" >
                                <input 
                                    placeholder="Search.." 
                                    onKeyUp={filterFunction}                              
                                />
                                <i className="fa fa-search" />
                        </label>
                        <ul>
                            {countriesList.map(c => (                                
                                <li 
                                    className={`list-item ${c.name === country && "selected"}`}
                                    key={c.name}                                                 
                                    onClick={(e) => {
                                        setCountry(e.target.textContent)
                                        seFlagIcon(`https://flagcdn.com/${c.code.toLowerCase()}.svg`)
                                        setSelectOpen(false)
                                    }}                               
                                >         
                                    <img
                                        alt={c.name} 
                                        src={`https://flagcdn.com/${c.code.toLowerCase()}.svg`}
                                    />                                    
                                    {c.name} 
                                </li>                                                
                            ))} 
                        </ul>
                    </animated.div>
                )}                                            
            </li>
        </ul>
        </Fragment>
    )
}

export default Countries
