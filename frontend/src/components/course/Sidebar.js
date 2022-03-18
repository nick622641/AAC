import React, { Fragment, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useSpring, animated } from 'react-spring'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ courses }) => {

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

                <h3>All Courses</h3>                              

                <ul className="list-style">   
                    {courses && courses.map((course, i) => (
                        
                        <li key={course._id}>   

                            <Link 
                                className={location.pathname.includes(course.slug) ? 'link-active' : ''}
                                to={`/course/${course.slug}`}
                                style={{ whiteSpace: "nowrap" }}
                            >                                                                   
                                {course.title}
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