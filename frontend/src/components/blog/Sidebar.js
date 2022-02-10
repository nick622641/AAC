import React, { Fragment, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom'

const Sidebar = ({ blogs }) => {

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

                <h3>Post Archives</h3>                              

                <ul className="list-style">   
                    {blogs && blogs.map(blog => (
                        
                        <li key={blog._id}>   

                            <Link 
                                to={`/blog/${blog._id}`}
                                className="whitespace-nowrap"
                            >                                                                   
                                {new Date(blog.createdAt).getDate()+ '/' + (new Date(blog.createdAt).getMonth() + 1) + '/' + new Date(blog.createdAt).getFullYear()}
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