import React, { Fragment, useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import countryList from './countryList'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import Backdrop from '@mui/material/Backdrop'

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
            <Backdrop
                invisible={true}
                open={isSelectOpen}
                onClick={() => setSelectOpen(false)}
            />         
        )}   

        <ul className="custom-select">
            <li className={isSelectOpen ? 'open' : ''}>
                <div
                    className="relative" 
                    onClick={() => setSelectOpen(!isSelectOpen)}
                    
                >   
                    {country && <img src={flagIcon}  alt={country} />}                
                    <span className={country ? 'set' : ''}>
                        {country ?  country : 'Country'}
                    </span> 
                    <IconButton 
                        className="select-chevron" 
                        sx={{ position: 'absolute', top: 0, right: 0 }}
                    >
                        {isSelectOpen ? (
                            <ExpandLessIcon />
                        ):(
                            <ExpandMoreIcon />
                        )}
                        
                    </IconButton>
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
                                <IconButton className="select-search">
                                    <SearchIcon />
                                </IconButton>
                        </label>
                        <ul>
                            <li className="text-right"><b><small>Frequently selected</small></b></li>
                            <li 
                                className={`list-item ${country === 'Canada'  && "selected"}`}                                                                          
                                onClick={(e) => {
                                    setCountry(e.target.textContent)
                                    seFlagIcon('https://flagcdn.com/ca.svg')
                                    setSelectOpen(false)
                                }}                               
                            >
                                 <img
                                    alt="Canada" 
                                    src={'https://flagcdn.com/ca.svg'}
                                />
                                Canada
                            </li>
                            <li 
                                className={`list-item ${country === 'Singapore'  && "selected"}`}                                                                          
                                onClick={(e) => {
                                    setCountry(e.target.textContent)
                                    seFlagIcon('https://flagcdn.com/sg.svg')
                                    setSelectOpen(false)
                                }}                               
                            >
                                 <img
                                    alt="Singapore" 
                                    src={'https://flagcdn.com/sg.svg'}
                                />
                                Singapore
                            </li>
                            <li 
                                className={`list-item ${country === 'United States'  && "selected"}`}                                                                          
                                onClick={(e) => {
                                    setCountry(e.target.textContent)
                                    seFlagIcon('https://flagcdn.com/us.svg')
                                    setSelectOpen(false)
                                }}                               
                            >
                                 <img
                                    alt="United States" 
                                    src={'https://flagcdn.com/us.svg'}
                                />
                                United States
                            </li>
                            <li 
                                className={`list-item ${country === 'United Kingdom'  && "selected"}`}                                                                          
                                onClick={(e) => {
                                    setCountry(e.target.textContent)
                                    seFlagIcon('https://flagcdn.com/gb.svg')
                                    setSelectOpen(false)
                                }}                               
                            >
                                 <img
                                    alt="United Kingdom" 
                                    src={'https://flagcdn.com/gb.svg'}
                                />
                                United Kingdom
                            </li> 
                            <li 
                                className={`list-item ${country === 'Australia'  && "selected"}`}                                                                          
                                onClick={(e) => {
                                    setCountry(e.target.textContent)
                                    seFlagIcon('https://flagcdn.com/au.svg')
                                    setSelectOpen(false)
                                }}                               
                            >
                                 <img
                                    alt="Australia" 
                                    src={'https://flagcdn.com/au.svg'}
                                />
                                Australia
                            </li>                           
                            <li 
                                className={`list-item ${country === 'France'  && "selected"}`}                                                                          
                                onClick={(e) => {
                                    setCountry(e.target.textContent)
                                    seFlagIcon('https://flagcdn.com/fr.svg')
                                    setSelectOpen(false)
                                }}                               
                            >
                                 <img
                                    alt="France" 
                                    src={'https://flagcdn.com/fr.svg'}
                                />
                                France
                            </li>
                            <li 
                                className={`list-item ${country === 'Germany'  && "selected"}`}                                                                          
                                onClick={(e) => {
                                    setCountry(e.target.textContent)
                                    seFlagIcon('https://flagcdn.com/de.svg')
                                    setSelectOpen(false)
                                }}                               
                            >
                                 <img
                                    alt="Germany" 
                                    src={'https://flagcdn.com/de.svg'}
                                />
                                Germany
                            </li>                            
                            <li className="text-right"><b><small>Alphabetical order</small></b></li>
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
