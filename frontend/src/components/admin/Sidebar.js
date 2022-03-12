import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { useMediaQuery } from 'react-responsive'
import IconButton from '@mui/material/IconButton'
import SpeedIcon from '@mui/icons-material/Speed'
import ImageSearchIcon from '@mui/icons-material/ImageSearch'
import CategoryIcon from '@mui/icons-material/Category'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import StarIcon from '@mui/icons-material/Star'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import AddIcon from '@mui/icons-material/Add'
import PersonIcon from '@mui/icons-material/Person'
import ExploreIcon from '@mui/icons-material/Explore'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import BrushIcon from '@mui/icons-material/Brush'
import PushPinIcon from '@mui/icons-material/PushPin'
import StarsIcon from '@mui/icons-material/Stars'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import ArticleIcon from '@mui/icons-material/Article'

const Sidebar = () => {

    const [ isSidebarOpen, setSideBarOpen ] = useState(false)
    const [ isBlogMenuVisible, setBlogMenuVisible ] = useState(false)
    const [ isPageMenuVisible, setPageMenuVisible ] = useState(false)
    const [ isArtistMenuVisible, setArtistMenuVisible ] = useState(false)
    const [ isMenuVisible, setMenuVisible ] = useState(false)
    const [ isCategoriesVisible, setCategoriesVisible ] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const sidebarAppear = useSpring({
        transform: isSidebarOpen && isMobile ? 'translateX(0)' : 'translateX(-100%)'
    })

    const toggleBlogMenu = () => {
        setBlogMenuVisible(isBlogMenuVisible => !isBlogMenuVisible)
    }
    const togglePageMenu = () => {
        setPageMenuVisible(isPageMenuVisible => !isPageMenuVisible)
    }
    const toggleArtistMenu = () => {
        setArtistMenuVisible(isArtistMenuVisible => !isArtistMenuVisible)
    }
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
    const blogMenuAppear = useSpring({
        transform: isBlogMenuVisible ? "translateY(0)" : "translateY(-40px)",
        opacity: isBlogMenuVisible ? 1 : 0
    })
    const pageMenuAppear = useSpring({
        transform: isPageMenuVisible ? "translateY(0)" : "translateY(-40px)",
        opacity: isPageMenuVisible ? 1 : 0
    })
    const artistMenuAppear = useSpring({
        transform: isArtistMenuVisible ? "translateY(0)" : "translateY(-40px)",
        opacity: isArtistMenuVisible ? 1 : 0
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
                {isSidebarOpen ? 'Hide Menu' : 'Show Menu'}
            </button>

            {(isSidebarOpen || !isMobile) && (
            <animated.div style={isMobile ? sidebarAppear : {}}>
            
                <nav>
                    <ul style={{ marginTop: 0 }}>

                        <li>
                            <Link to="/admin/dashboard">
                                <IconButton>
                                    <SpeedIcon />
                                </IconButton>
                                &nbsp; Dashboard
                            </Link>
                        </li>                    
                        <li onClick={() => {toggleBlogMenu()}}>                        
                           
                            <IconButton>
                                <PushPinIcon />
                            </IconButton>
                            &nbsp; Blogs
                            <IconButton className="arrow-down">
                                {isBlogMenuVisible ? (
                                    <ArrowDropUpIcon />
                                ):(
                                    <ArrowDropDownIcon />
                                )}                                
                            </IconButton>
                       
                            {isBlogMenuVisible && ( 
                            <animated.div className="dropdown-menu" style={blogMenuAppear}>  
                                <ul>                            
                                    <li>
                                        <Link to="/admin/blogs">
                                            <IconButton>
                                                <ImageSearchIcon />
                                            </IconButton>                                            
                                            &nbsp; All
                                        </Link>
                                    </li>
                        
                                    <li>
                                        <Link to="/admin/blog">
                                            <IconButton>
                                                <AddIcon />
                                            </IconButton> 
                                            &nbsp; Create
                                        </Link>
                                    </li>
                                </ul>
                            </animated.div>
                            )}
                        </li>

                        <li onClick={() => {togglePageMenu()}}>                        
                           
                            <IconButton>
                                <ContactPageIcon />
                            </IconButton>
                            &nbsp; Pages
                            <IconButton className="arrow-down">
                                {isPageMenuVisible ? (
                                    <ArrowDropUpIcon />
                                ):(
                                    <ArrowDropDownIcon />
                                )}                                
                            </IconButton>
                       
                            {isPageMenuVisible && ( 
                            <animated.div className="dropdown-menu" style={pageMenuAppear}>  
                                <ul>                            
                                    <li>
                                        <Link to="/admin/pages">
                                            <IconButton>
                                                <ImageSearchIcon />
                                            </IconButton>                                            
                                            &nbsp; All
                                        </Link>
                                    </li>
                        
                                    <li>
                                        <Link to="/admin/page">
                                            <IconButton>
                                                <AddIcon />
                                            </IconButton> 
                                            &nbsp; Create
                                        </Link>
                                    </li>
                                </ul>
                            </animated.div>
                            )}
                        </li>

                        <li onClick={() => {toggleArtistMenu()}}>                        
                           
                            <IconButton>
                                <ArticleIcon />
                            </IconButton>
                            &nbsp; Artist Bios
                            <IconButton className="arrow-down">
                                {isArtistMenuVisible ? (
                                    <ArrowDropUpIcon />
                                ):(
                                    <ArrowDropDownIcon />
                                )}                                
                            </IconButton>
                       
                            {isArtistMenuVisible && ( 
                            <animated.div className="dropdown-menu" style={artistMenuAppear}>  
                                <ul>                            
                                    <li>
                                        <Link to="/admin/painters">
                                            <IconButton>
                                                <ImageSearchIcon />
                                            </IconButton>                                            
                                            &nbsp; All
                                        </Link>
                                    </li>
                        
                                    <li>
                                        <Link to="/admin/painter">
                                            <IconButton>
                                                <AddIcon />
                                            </IconButton> 
                                            &nbsp; Create
                                        </Link>
                                    </li>
                                </ul>
                            </animated.div>
                            )}
                        </li>

                        <li onClick={() => {toggleMenu()}}>                        
                           
                            <IconButton>
                                <BrushIcon />
                            </IconButton>
                            &nbsp; Artwork
                            <IconButton className="arrow-down">
                                {isMenuVisible ? (
                                    <ArrowDropUpIcon />
                                ):(
                                    <ArrowDropDownIcon />
                                )}                                
                            </IconButton>
                       
                            {isMenuVisible && ( 
                            <animated.div className="dropdown-menu" style={menuAppear}>  
                                <ul>                            
                                    <li>
                                        <Link to="/admin/products">
                                            <IconButton>
                                                <ImageSearchIcon />
                                            </IconButton>                                            
                                            &nbsp; All
                                        </Link>
                                    </li>
                        
                                    <li>
                                        <Link to="/admin/product">
                                            <IconButton>
                                                <AddIcon />
                                            </IconButton> 
                                            &nbsp; Create
                                        </Link>
                                    </li>
                                </ul>
                            </animated.div>
                            )}
                        </li>
                        <li onClick={() => {toggleCategories()}}>                      
                           
                            <IconButton>
                                <CategoryIcon />
                            </IconButton>
                            &nbsp; Categories
                            <IconButton className="arrow-down">
                                {isCategoriesVisible ? (
                                    <ArrowDropUpIcon />
                                ):(
                                    <ArrowDropDownIcon />
                                )}                                
                            </IconButton>
                        
                            {isCategoriesVisible && ( 
                                <animated.div className="dropdown-menu" style={categoriesAppear}>  
                                    <ul>                            
                                        <li>
                                            <Link to="/admin/artists">
                                                <IconButton>
                                                    <PersonIcon />
                                                </IconButton>
                                                &nbsp; Artists
                                            </Link>
                                        </li>                    
                                        <li>
                                            <Link to="/admin/orientations">
                                                <IconButton>
                                                    <ExploreIcon />
                                                </IconButton>
                                                &nbsp; Orientations
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/media">
                                                <IconButton>
                                                    <ColorLensIcon />
                                                </IconButton>
                                                &nbsp; Media
                                            </Link>
                                        </li>
                                    </ul>
                                </animated.div>
                            )}
                        </li>    
                        <li>
                            <Link to="/admin/orders">
                                <IconButton>
                                    <ShoppingBasketIcon />
                                </IconButton>
                                &nbsp; Orders
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/users">
                                <IconButton>
                                    <PeopleAltIcon />
                                </IconButton>
                                &nbsp; Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/reviews">
                                <IconButton>
                                    <StarIcon />
                                </IconButton>
                                &nbsp; Reviews
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/comments">
                                <IconButton>
                                    <StarsIcon />
                                </IconButton>
                                &nbsp; Comments
                            </Link>
                        </li>
                
                </ul>
            </nav>
        
        </animated.div>
        )}        

    </Fragment>

    )

}

export default Sidebar
