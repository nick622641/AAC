import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import { getArtists } from '../../actions/categoryActions'
import Modal from '../modals/Modal'
import Contact from '../modals/Contact'
import Search from './Search'
import './layout.css'

const Header = () => {

    const dispatch = useDispatch()
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
                <div className="backdrop" onClick={() => setIsNavOpen(!isNavOpen)} /> 
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
                                                    // to={`gallery?artist=${artist.name.replace(/ /g, '-')}`}
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

                <div className="icons">
                    <i 
                        className="fa fa-ellipsis-v" 
                        onClick={() => {
                            setIsNavOpen(!isNavOpen)
                            window.scrollTo(0, 0)
                        }}
                    />  
                    <i 
                        className="fa fa-search" 
                        onClick={toggleSearch}
                    />                         
                    <Link to="/cart" className="openCart">
                        <i className="fa fa-shopping-cart" /> 
                        <small>{cartItems.length}</small>   
                    </Link>
                    <i 
                        className="fa fa-envelope" 
                        onClick={toggleModal}
                    /> 
                    
                    {user ? (
                        <Fragment>
                            <div className="relative">
                                <figure onClick={toggleMenu}>
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}  
                                        className="centered-image"
                                    /> 
                                </figure>
                            <small>{user && user.name}</small>
                            </div>
                            {isMenuVisible && ( 
                            <Fragment>
                            <div className="backdrop" onClick={toggleMenu} style={{ background: "none" }} />
                            <animated.div className="dropdown-menu" style={menuAppear}>
                                {user && user.role === 'admin' && (
                                    <Link to="/dashboard" onClick={toggleMenu}
                                    >Dashboard 
                                        <i className="fa fa-tachometer" />
                                    </Link>
                                )}
                                <Link to="/orders/me" onClick={toggleMenu}>
                                    Orders 
                                    <i className="fa fa-cart-plus" />
                                </Link>
                                <Link to="/me" onClick={toggleMenu}>
                                    Profile 
                                    <i className="fa fa-user-circle-o" />
                                </Link>
                                <Link to="/" onClick={logoutHandler}>
                                    Logout 
                                    <i className="fa fa-sign-out" />
                                </Link>
                            </animated.div>
                            </Fragment>
                            )}
                        </Fragment>
                    ) : !loading && (
                        <Link to="/login">
                            <i className="fa fa-unlock-alt" />
                        </Link>
                    )}                          

                    <Link to="#!" target="_blank">
                        <i className="fa fa-facebook" />
                    </Link>

                    <Modal
                        isModalVisible={isModalVisible} 
                        onBackdropClick={toggleModal}   
                        content={<Contact />}
                    />

                </div>

                {isSearchVisible && ( 

                    <Fragment>
                        <div className="backdrop" onClick={toggleSearch} style={{ background: "none" }} />
                        <animated.div style={searchAppear} className="searchform">

                        <Search setIsSearchVisible={setSearchVisible} isSearchVisible={isSearchVisible} />  

                        </animated.div>  
                    </Fragment>                             

                )}

            </header> 
            
        </Fragment>

    )
    
}

export default Header
