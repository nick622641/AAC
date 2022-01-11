import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

        <form onSubmit={searchHandler}>

            <div>

                <input 
                    placeholder="Search Site" 
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value)
                        searchHandler(e)
                    }} 
                    autoFocus
                />  
                
            </div>  
            
        </form>

    )

}

export default Search
