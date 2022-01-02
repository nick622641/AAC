import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { useMediaQuery } from 'react-responsive'

const Sidebar = () => {

    const [ isSidebarOpen, setSideBarOpen] = useState(false)
    const [ isMenuVisible, setMenuVisible ] = useState(false)
    const [ isCategoriesVisible, setCategoriesVisible ] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const sidebarAppear = useSpring({
        transform: isSidebarOpen && isMobile ? 'translateX(0)' : 'translateX(-100%)'
    })

    const toggleMenu = () => {
        setMenuVisible(isMenuVisible => !isMenuVisible)
    }
    const toggleCategories = () => {
        setCategoriesVisible(isCategoriesVisible => !isCategoriesVisible)
    }

    const menuAppear = useSpring({
        transform: isMenuVisible ? "translate3D(0,0,0)" : "translate3D(0,-40px,0)",
        opacity: isMenuVisible ? 1 : 0
    })
    const categoriesAppear = useSpring({
        transform: isCategoriesVisible ? "translate3D(0,0,0)" : "translate3D(0,-40px,0)",
        opacity: isCategoriesVisible ? 1 : 0
    })

    return (

        <Fragment>

        <button 
            className="filters show-filter"
            onClick={() => {setSideBarOpen(!isSidebarOpen)}}
        >
            SHOW MENU
        </button>

        {(isSidebarOpen || !isMobile) && (
            <animated.div style={isMobile ? sidebarAppear : {}}>
            
                <nav>
                    <ul>

                        <li>
                            <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                        </li>
                    
                        <li onClick={() => {toggleMenu()}} style={{ cursor: "pointer" }}>                        
                            <span>
                                <i className="fa fa-picture-o"></i> 
                                &nbsp;Artwork 
                                <i className={isMenuVisible ? 'fa fa-caret-up' : 'fa fa-caret-down'} aria-hidden="true"></i>
                            </span>
                            {isMenuVisible && ( 
                            <animated.div className="dropdown-menu" style={menuAppear}>  
                                <ul>                            
                                    <li>
                                        <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
                                    </li>
                        
                                    <li>
                                        <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
                                    </li>
                                </ul>
                            </animated.div>
                            )}
                        </li>

                        <li onClick={() => {toggleCategories()}} style={{ cursor: "pointer" }}>                        
                            <span>
                                <i className="fa fa-tags"></i> 
                                &nbsp;Categories 
                                <i className={isCategoriesVisible ? 'fa fa-caret-up' : 'fa fa-caret-down'} aria-hidden="true"></i>
                            </span>
                            {isCategoriesVisible && ( 
                            <animated.div className="dropdown-menu" style={categoriesAppear}>  
                                <ul>                            
                                    <li>
                                        <Link to="/admin/artists"><i className="fa fa-user"></i> Artists</Link>
                                    </li>                    
                                    <li>
                                        <Link to="/admin/orientations"><i className="fa fa-compass"></i> Orientations</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/media"><i className="fa fa-paint-brush"></i> Media</Link>
                                    </li>
                                </ul>
                            </animated.div>
                            )}
                        </li>
    
                        <li>
                            <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                        </li>

                        <li>
                            <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                        </li>

                        <li>
                            <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                        </li>
                
                </ul>
            </nav>
        
            </animated.div>
        )}

        

    </Fragment>
    )
}

export default Sidebar
