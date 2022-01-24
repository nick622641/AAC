import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

const Search = (props) => {

    const navigate = useNavigate()    
    const [ keyword, setKeyword ] = useState('')    

    const searchHandler = (e) => {
        if (e._reactName === 'onSubmit'){
            e.preventDefault()  
            props.setIsSearchVisible(!props.isSearchVisible)  
        }           
        if(keyword.trim()) {
            navigate(`/gallery/${keyword}`)
        } else {
            navigate('/gallery')
        }
    }

    return (

        <form onSubmit={searchHandler} className="relative">            

            <input 
                placeholder="Search Site" 
                value={keyword}
                onChange={(e) => {
                    setKeyword(e.target.value)
                    searchHandler(e)
                }} 
                autoFocus
            /> 

            <IconButton 
                sx={{ position: "absolute", top: 40, right: 0 }} 
                type="submit"
            >
                <SearchIcon fontSize="large" />
            </IconButton>
            
        </form>

    )

}

export default Search
