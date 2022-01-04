import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { useMediaQuery } from 'react-responsive'

const Sidebar = () => {

    const [ isSidebarOpen, setSideBarOpen ] = useState(false)
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
        transform: isMenuVisible ? "translateY(0)" : "translateY(-40px)",
        opacity: isMenuVisible ? 1 : 0
    })
    const categoriesAppear = useSpring({
        transform: isCategoriesVisible ? "translateY(0)" : "translateY(-40px)",
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
                            <Link to="/dashboard"><i className="fa fa-tachometer" /> <span>Dashboard</span></Link>
                        </li>                    
                        <li onClick={() => {toggleMenu()}}>                        
                            <span>
                                <i className="fa fa-picture-o" /> 
                                &nbsp;Artwork
                                <i className={isMenuVisible ? 'fa fa-caret-up' : 'fa fa-caret-down'} />
                            </span>
                            {isMenuVisible && ( 
                            <animated.div className="dropdown-menu" style={menuAppear}>  
                                <ul>                            
                                    <li>
                                        <Link to="/admin/products"><i className="fa fa-clipboard" /> All</Link>
                                    </li>
                        
                                    <li>
                                        <Link to="/admin/product"><i className="fa fa-plus" /> Create</Link>
                                    </li>
                                </ul>
                            </animated.div>
                            )}
                        </li>
                        <li onClick={() => {toggleCategories()}}>                        
                            <span>
                                <i className="fa fa-tags" /> 
                                &nbsp;Categories
                                <i className={isCategoriesVisible ? 'fa fa-caret-up' : 'fa fa-caret-down'} />
                            </span>
                            {isCategoriesVisible && ( 
                            <animated.div className="dropdown-menu" style={categoriesAppear}>  
                                <ul>                            
                                    <li>
                                        <Link to="/admin/artists"><i className="fa fa-user" /> Artists</Link>
                                    </li>                    
                                    <li>
                                        <Link to="/admin/orientations"><i className="fa fa-compass" /> Orientations</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/media"><i className="fa fa-paint-brush" /> Media</Link>
                                    </li>
                                </ul>
                            </animated.div>
                            )}
                        </li>    
                        <li>
                            <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> <span>Orders</span></Link>
                        </li>
                        <li>
                            <Link to="/admin/users"><i className="fa fa-users"></i> <span>Users</span></Link>
                        </li>
                        <li>
                            <Link to="/admin/reviews"><i className="fa fa-star"></i> <span>Reviews</span></Link>
                        </li>
                
                </ul>
            </nav>
        
        </animated.div>
        )}        

    </Fragment>

    )

}

export default Sidebar
