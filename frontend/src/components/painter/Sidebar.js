import React, { Fragment, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useSpring, animated } from 'react-spring'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ painters }) => {

    const location = useLocation()

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

                <h3>Artists</h3>                              

                <ul className="list-style">   
                    {painters && painters.map((painter, i) => (
                        
                        <li key={painter._id}>   

                            <Link 
                                className={location.pathname.includes(painter.slug) ? 'link-active' : ''}
                                to={`/painter/${painter.slug}`}
                                style={{ whiteSpace: "nowrap" }}
                            >                                                                   
                                {painter.title}
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