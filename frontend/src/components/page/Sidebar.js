import React, { Fragment, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom'

const Sidebar = ({ pages }) => {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const [ isMenuOpen,  setIsMenuOpen  ] = useState(false)  

    const menuAppear = useSpring({
        transform: isMenuOpen && isMobile ? 'translateX(0)' : 'translateX(-100%)'
    })

    const resetPage = () => {        
        setIsMenuOpen(false)
        window.scrollTo(0, 0)           
    }

    return (

        <Fragment>

            <button 
                className="filters"
                onClick={() => {setIsMenuOpen(!isMenuOpen)}}
            >
                Show Menu
            </button>

            {(isMenuOpen || !isMobile) && (
            <animated.div style={isMobile ? menuAppear : {}}>

                <h3>Pages</h3>                              

                <ul className="list-style">   
                    {pages && pages.map((page, i) => (
                        
                        <li key={page._id}>   

                            <Link 
                                to={`/page/${page.slug}`}
                                className="whitespace-nowrap"
                            >                                                                   
                                {page.title}
                            </Link>
                        </li>
                    ))}
                </ul>       

                <button 
                    className="filters"
                    onClick={resetPage}
                >
                    Hide Menu
                </button>

            </animated.div>
            
            )} 

        </Fragment>

  )

}

export default Sidebar