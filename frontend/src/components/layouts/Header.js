import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import { getArtists } from '../../actions/categoryActions'
import { styled } from '@mui/material/styles'
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

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      border: '2px solid white',
      padding: '0 4px',
      backgroundColor: 'var(--primary-color)',
      lineHeight: '18px'
    },
  }))

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert    = useAlert()
    
    const { user, loading } = useSelector( state => state.auth )
    const { cartItems     } = useSelector( state => state.cart )
    const { artists       } = useSelector( state => state.artists )

    const [ isNavOpen,       setIsNavOpen      ] = useState(false)
    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ isSearchVisible, setSearchVisible  ] = useState(false)
    const [ isMenuVisible,   setMenuVisible    ] = useState(false)

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

    useEffect(() => {

        dispatch(getArtists())       

    }, [dispatch])
   
    
    return (

        <Fragment>

            {isNavOpen && ( 

                <Backdrop
                    sx={{ zIndex: 1 }}
                    open={isNavOpen}
                    onClick={() => setIsNavOpen(!isNavOpen)}
                />
            )}  

            <header            
                style={
                    {
                        marginBottom: isSearchVisible ? "250px" : "0",
                        position: isNavOpen ? "relative" : "sticky"
                    }
                }                
            >      

                <div className="logo">

                    <Link to="/"><img src="/images/logo100.png" alt="Logo" /></Link>

                </div>

                <nav>
    
                    <ul>        

                        <li>                               

                            {isNavOpen && (  

                            <animated.ul style={animation}>   
                                
                                <li>
                                    <h5>Galleries</h5>
                                    <ul className="list-style">
                    
                                        <li>
                                            <Link 
                                                to="/gallery" 
                                                onClick={() => setIsNavOpen(!isNavOpen)}
                                            >
                                                All the Work
                                            </Link>
                                        </li> 

                                        {artists && artists.map( (artist, index) => ( 
                                            <li key={artist._id}>
                                                
                                                <Link 
                                                    to={`gallery/artist/${artist.name.replace(/ /g, '-')}`}
                                                    onClick={() => setIsNavOpen(!isNavOpen)}
                                                >
                                                    {artist.name}
                                                </Link>                                               
                                            </li>    
                                        ))}                                                                         
                    
                                    </ul>                                        
                                </li>
                                <li>
                                    <h5>About</h5>
                                    <ul className="list-style">
                    
                                        <li>
                                            <Link 
                                                to="#!" 
                                                onClick={() => setIsNavOpen(!isNavOpen)}
                                            >
                                                Meet the Team
                                            </Link>
                                        </li>                                     
                    
                                    </ul>                                        
                                </li>

                            </animated.ul> 

                            )}
                                    
                        </li>                 
        
                    </ul>   

                </nav>            

                <div className="relative d-flex">

                    <IconButton
                        onClick={() => {
                            setIsNavOpen(!isNavOpen)
                            window.scrollTo(0, 0)
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    &nbsp;
                    <IconButton
                        onClick={() => {
                            toggleSearch()
                            setIsNavOpen(false)
                        }}
                    >
                        <SearchIcon />
                    </IconButton>                                                        
                    &nbsp;
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
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton>   
                    &nbsp;&nbsp;
                    <IconButton
                        onClick={() => { 
                            toggleModal()
                            setIsNavOpen(false)
                        }}
                    >
                        <EmailIcon />
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
                                    className="whitespace-nowrap absolute"
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
                                    <Link to="/dashboard" onClick={toggleMenu}>
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
                                <LoginIcon />
                            </IconButton>
                        </Link>
                    )}  

                    <Divider orientation="vertical" flexItem  sx={{ mx: 1 }}/> 

                    <IconButton>
                        <FacebookSharpIcon/>
                    </IconButton>

                    <Modal
                        isModalVisible={isModalVisible} 
                        onBackdropClick={toggleModal}   
                        content={<Contact />}
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
