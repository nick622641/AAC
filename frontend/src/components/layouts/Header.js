import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { useAlert } from 'react-alert'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import { getArtists, getMedia } from '../../actions/categoryActions'
import { getPainters } from '../../actions/painterActions'
import { styled } from '@mui/material/styles'
import { useMediaQuery } from 'react-responsive'
import Modal from '../modals/Modal'
import Contact from '../modals/Contact'
import Search from './Search'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'
import EmailIcon from '@mui/icons-material/Email'
import Avatar from '@mui/material/Avatar'
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp'
import SpeedIcon from '@mui/icons-material/Speed'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import Divider from '@mui/material/Divider'
import LoginIcon from '@mui/icons-material/Login'
import Backdrop from '@mui/material/Backdrop'
import './layout.css'

const Header = () => {    

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const alert    = useAlert()
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })
   
    const { user, loading } = useSelector( state => state.auth )
    const { cartItems     } = useSelector( state => state.cart )
    const { artists       } = useSelector( state => state.artists )
    const { media         } = useSelector( state => state.media )
    const { painters      } = useSelector( state => state.painters )

    const [ isNavOpen,       setIsNavOpen      ] = useState(false)
    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ isSearchVisible, setSearchVisible  ] = useState(false)
    const [ isMenuVisible,   setMenuVisible    ] = useState(false)
    const [ menuItem,        setMenuItem       ] = useState(0)
    const [ isMenuOpen,      setIsMenuOpen     ] = useState(false)  
    const [ fixed,           setFixed          ] = useState(false)
    
    const pathname = location.pathname.replace(/-/g, ' ')

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            border: '2px solid white',
            padding: '0 4px',
            backgroundColor: 'var(--primary-color)',
            lineHeight: '18px'
        },
    }))

    const logoutHandler = () => {
        dispatch(logout())
        setMenuVisible(false)
        alert.success('Logged Out Successfully')
    }
    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }
    const toggleSearch = () => {
        setSearchVisible(isSearchVisible => !isSearchVisible)
    }
    const toggleMenu = () => {
        setMenuVisible(isMenuVisible => !isMenuVisible)
    }
    const handleNavigation = (e, item) => {
        if (!isNavOpen || (isNavOpen && item === menuItem)) {
            setIsNavOpen(!isNavOpen)
        }
        const links = document.querySelectorAll('header > nav > ul > li')
        for (let i = 0; i < links.length; i++ ) {
            links[i].classList.remove('open')
        }
        if (!isNavOpen || (isNavOpen && item !== menuItem)) {
            e.target.parentNode.classList.add('open')
        }        
        setMenuItem(item)       
        window.scrollTo(0, 0)
    }
    const menuAppear = useSpring({
        transform: isMenuVisible ? "translateY(0)" : "translateY(-40px)",
        opacity: isMenuVisible ? 1 : 0
    })
    const animation = useSpring({   
        opacity: isNavOpen ? 1 : 0,
        transform: isNavOpen ? "translateX(0%)" : "translateX(100%)"       
    })
    const searchAppear = useSpring({
        transform: isSearchVisible ? "translateY(0)" : "translateY(-40px)",
    })
    const navMenuAppear = useSpring({
        transform: isMenuOpen && isMobile ? 'translateX(0)' : 'translateX(100%)'
    })

    useEffect(() => {
        dispatch(getArtists())  
        dispatch(getMedia())  
        dispatch(getPainters())  
    }, [dispatch])

   

    useEffect(() => {
        if (typeof window !== 'undefined') {
          window.addEventListener('scroll', () =>
            setFixed(window.scrollY  > 400)
          )
          return () => {
            window.removeEventListener('scroll', setFixed)
          }
        }
    }, [])         
    
    return (

        <Fragment>

            <Backdrop
                sx={{ zIndex: 1 }}
                open={isNavOpen || isMenuOpen}
                onClick={() => {
                    setIsMenuOpen(false)
                    setIsNavOpen(false)
                    }                  
                }
            /> 

            <header 
                id={(location.pathname === '/' && !isNavOpen && !isMenuVisible && !isMenuOpen && !isSearchVisible) ? 'homepage' : ''}           
                className={fixed ? 'fixed' : ''}           
                style={{ marginBottom: isSearchVisible ? '250px' : '0' }}                
            >      

                <div className="logo">

                    <Link to="/">
                        <img 
                            src={(location.pathname === '/' && !isNavOpen && !isMenuVisible && !isMenuOpen && !isSearchVisible && !fixed) 
                                ? '/images/logoLight100.png' 
                                : '/images/logo100.png'
                            }
                            alt="Logo" 
                        />
                    </Link>

                </div>

                <nav>

                {(isMenuOpen || !isMobile) && (
                    <animated.ul style={isMobile ? navMenuAppear : {}} className="d-flex">        

                        <li>
                            <span
                                onClick={(e) => handleNavigation(e, 0)}
                                className="cursor-pointer"
                            >
                                Galleries
                            </span>                         

                            {isNavOpen && menuItem === 0 && (  

                            <animated.ul style={animation}>   
                                
                                <li>
                                    <h5>Gallery by Artist</h5>
                                    <ul className="list-style">                    
                                        <li>
                                            <Link 
                                                to="/gallery" 
                                                onClick={() => {
                                                        setIsMenuOpen(false)
                                                        setIsNavOpen(false)
                                                    }
                                                }
                                            >
                                                All the Work
                                            </Link>
                                        </li> 
                                        {artists && artists.map( (artist, index) => ( 
                                            <li key={artist._id}>                                                
                                                <Link
                                                    className={pathname.includes(artist.name) ? 'link-active' : ''} 
                                                    to={`gallery/artist/${artist.name.replace(/ /g, '-')}`}
                                                    onClick={() => {
                                                                setIsMenuOpen(false)
                                                                setIsNavOpen(false)
                                                            }
                                                        }
                                                >
                                                    {artist.name}
                                                </Link>                                               
                                            </li>    
                                        ))}                                                                         
                    
                                    </ul>                                        
                                </li>    

                                <li>
                                    <h5>Gallery by Media</h5>
                                    <ul className="list-style">    

                                        {media && media.map( (medium, index) => ( 
                                            <li key={medium._id}>                                                
                                                <Link 
                                                    className={pathname.includes(medium.name) ? 'link-active' : ''}
                                                    to={`gallery/medium/${medium.name.replace(/ /g, '-')}`}
                                                    onClick={() => {
                                                            setIsNavOpen(false)
                                                            setIsMenuOpen(false)
                                                        }
                                                    }
                                                >
                                                    {medium.name}
                                                </Link>                                               
                                            </li>    
                                        ))}                                                                         
                    
                                    </ul>                                        
                                </li>                             

                            </animated.ul> 

                            )}
                                    
                        </li> 
                        
                        <li>
                            <span
                                onClick={(e) => handleNavigation(e, 1)}
                                className="cursor-pointer"
                            >
                                About
                            </span> 

                            {isNavOpen && menuItem === 1 && (  

                                <animated.ul style={animation}>

                                    <li>
                                        <h5>Who We Are</h5>
                                        <ul className="list-style"> 
                                            <li>
                                                <Link 
                                                    to="/staff" 
                                                    onClick={() => {
                                                            setIsNavOpen(false)
                                                            setIsMenuOpen(false)
                                                        }
                                                    }
                                                >
                                                    Meet The Team
                                                </Link>
                                            </li>  
                                            <li>
                                                <Link 
                                                    to="/page/our-passion" 
                                                    onClick={() => {
                                                            setIsNavOpen(false)
                                                            setIsMenuOpen(false)
                                                        }
                                                    }
                                                >
                                                    Our Passion
                                                </Link>
                                            </li> 
                                            <li>
                                                <Link 
                                                    to="/page/buying-and-shipping" 
                                                    onClick={() => {
                                                            setIsNavOpen(false)
                                                            setIsMenuOpen(false)
                                                        }
                                                    }
                                                >
                                                    Buying & Shipping
                                                </Link>
                                            </li>  
                                            <li>
                                                <Link 
                                                    to="/friends" 
                                                    onClick={() => {
                                                            setIsNavOpen(false)
                                                            setIsMenuOpen(false)
                                                        }
                                                    }
                                                >
                                                    Friends of AAC
                                                </Link>
                                            </li>                                
                        
                                        </ul>                                        
                                    </li>

                                </animated.ul>

                            )}
                            
                        </li>    

                        <li>
                            <span
                                onClick={(e) => handleNavigation(e, 2)}
                                className="cursor-pointer"
                            >
                                Community
                            </span> 

                            {isNavOpen && menuItem === 2 && (  

                                <animated.ul style={animation}>

                                    <li>
                                        <h5>About</h5>
                                        <ul className="list-style"> 
                                            <li>
                                                <Link 
                                                    to="blogs" 
                                                    onClick={() => {
                                                            setIsNavOpen(false)
                                                            setIsMenuOpen(false)
                                                        }
                                                    }
                                                >
                                                    Blogs
                                                </Link>
                                            </li>                                  
                        
                                        </ul>                                        
                                    </li>

                                </animated.ul>

                            )}
                            
                        </li>   

                        <li>
                            <span
                                onClick={(e) => handleNavigation(e, 3)}
                                className="cursor-pointer"
                            >
                                Artists
                            </span>                         

                            {isNavOpen && menuItem === 3 && (  

                            <animated.ul style={animation}>   
                                
                                <li>
                                    <h5>Meet the Artists</h5>
                                    <ul className="list-style">   
                                        <li>
                                            <Link 
                                                to="/painters" 
                                                onClick={() => {
                                                        setIsMenuOpen(false)
                                                        setIsNavOpen(false)
                                                    }
                                                }
                                            >
                                                All the Artists
                                            </Link>
                                        </li>                  
                                     
                                        {painters && painters.map( (painter, index) => ( 
                                            <li key={painter._id}>                                                
                                                <Link 
                                                    className={location.pathname.includes(painter.slug) ? 'link-active' : ''}
                                                    to={`painter/${painter.slug}`}
                                                    onClick={() => {
                                                                setIsMenuOpen(false)
                                                                setIsNavOpen(false)
                                                            }
                                                        }
                                                >
                                                    {painter.title}
                                                </Link>                                               
                                            </li>    
                                        ))}                                                                         
                    
                                    </ul>                                        
                                </li>                            

                            </animated.ul> 

                            )}
                                    
                        </li>  

                        <li>
                            <span
                                onClick={(e) => handleNavigation(e, 4)}
                                className="cursor-pointer"
                            >
                                Learning
                            </span> 

                            {isNavOpen && menuItem === 4 && (  

                                <animated.ul style={animation}>

                                    <li>
                                        <h5>Join the Tour</h5>
                                        <ul className="list-style"> 
                                            <li>
                                                <Link to={'/login?redirect=courses'}
                                                    onClick={() => {
                                                            setIsNavOpen(false)
                                                            setIsMenuOpen(false)
                                                        }
                                                    }
                                                >
                                                    Courses
                                                </Link>
                                            </li>                                  
                        
                                        </ul>                                        
                                    </li>

                                </animated.ul>

                            )}
                            
                        </li>             
        
                    </animated.ul> 
                )}  

                </nav>            

                <div className="relative d-flex icons">

                    <IconButton 
                        onClick={() => {
                            setIsMenuOpen(!isMenuOpen)
                            if(isNavOpen) {
                                setIsNavOpen(false)
                            }
                        }} 
                        className="mobile-menu"
                    >
                        <MoreVertIcon className="header-icon" />
                    </IconButton>

                    <IconButton
                        onClick={() => {
                            toggleSearch()
                            setIsNavOpen(false)
                        }}
                    >
                        <SearchIcon className="header-icon" />
                    </IconButton>                                                        

                    <IconButton
                        onClick={() => {
                            setIsNavOpen(false)
                            navigate('/cart')
                        }}
                    >
                        <StyledBadge                             
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={cartItems.length} 
                            color="primary"
                        >
                            <ShoppingCartIcon className="header-icon" />
                        </StyledBadge>
                    </IconButton>   

                    <IconButton
                        onClick={() => { 
                            toggleModal()
                            setIsNavOpen(false)
                        }}
                    >
                        <EmailIcon className="header-icon" />
                    </IconButton>              
                    &nbsp;
                    {user ? (
                        <Fragment>
                            <div className="relative">   
                                <IconButton 
                                    onClick={() => {
                                        toggleMenu()
                                        setIsNavOpen(false)
                                    }}
                                >                                                  
                                    <Avatar 
                                        alt={user && user.name} 
                                        src={user.avatar && user.avatar.url}                                         
                                    />
                                </IconButton>  
                                
                                <small 
                                    className="whitespace-nowrap absolute name"
                                    style={{ right: 0, top: "100%" }}
                                >
                                    {user && user.name}
                                </small>                            
                            </div>
                            {isMenuVisible && ( 
                            <Fragment>

                            <Backdrop
                                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                invisible={true}
                                open={isMenuVisible}
                                onClick={toggleMenu}
                            /> 

                            <animated.div className="dropdown-menu" style={menuAppear}>

                                {user && user.role === 'admin' && (
                                    <Link to="/admin/dashboard" onClick={toggleMenu}>
                                        Dashboard &nbsp;
                                        <IconButton>
                                            <SpeedIcon />
                                        </IconButton>
                                    </Link>
                                )}

                                <Link to="/me" onClick={toggleMenu}>
                                    Profile &nbsp; 
                                    <IconButton>
                                        <PersonOutlineIcon />
                                    </IconButton>
                                </Link>

                                <Link to="/orders/me" onClick={toggleMenu}>
                                    Orders &nbsp; 
                                    <IconButton>
                                        <ShoppingBasketIcon />
                                    </IconButton>
                                </Link>
                                
                                <Link to="/" onClick={logoutHandler}>
                                    Logout &nbsp; 
                                    <IconButton>
                                        <LogoutIcon />
                                    </IconButton>
                                </Link>

                            </animated.div>
                            </Fragment>
                            )}
                        </Fragment>
                    ) : !loading && (
                        <Link 
                            to="/login"
                            onClick={() => {setIsNavOpen(false)}}
                        >
                            <IconButton>
                                <LoginIcon className="header-icon" />
                            </IconButton>
                        </Link>
                    )} 

                    &nbsp; 

                    {!isMobile && (
                        <Divider orientation="vertical" flexItem  sx={{ mx: 1 }}/> 
                    )}  

                    &nbsp;
                    
                    <IconButton>
                        <a 
                            href="https://www.facebook.com/abstractartcanada/" 
                            target="_biank"
                            style={{ fontSize: 0 }}
                        >
                            <FacebookSharpIcon 
                                color="facebook" 
                                sx={{ fontSize: "32px" }} 
                            />
                        </a>
                    </IconButton>                   

                    <Modal
                        isModalVisible={isModalVisible} 
                        onBackdropClick={toggleModal}   
                        content={ <Contact /> }
                    />

                </div>

                {isSearchVisible && ( 

                    <Fragment>

                        <Backdrop
                            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={isSearchVisible}
                            onClick={toggleSearch}
                        />                  

                        <animated.div style={searchAppear} className="searchform">

                            <Search 
                                setIsSearchVisible={setSearchVisible} 
                                isSearchVisible={isSearchVisible} 
                            />  

                        </animated.div>  

                    </Fragment>                             

                )}

            </header>             
            
        </Fragment>

    )
    
}

export default Header
