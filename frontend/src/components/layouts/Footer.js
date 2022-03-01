import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Social from './Social'
import ScrollToTop from 'react-scroll-to-top'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

const Footer = () => {

    return (

        <Fragment>

            <footer>

                <div className="container">   

                    <div className="wrapper">

                        <ul className="parent">
                        
                            <li>
                                <h6>Galleries</h6>                               
                                <ul>                               
                                
                                    <li>
                                        <Link to="/gallery">All the Work</Link>
                                    </li> 
                                                        
                                </ul>
                            </li>

                            <li>
                                <h6>Technical</h6>
                                <ul>                               
                                
                                    <li>
                                        <Link to="/terms">Terms & Conditions</Link>
                                    </li> 
                                    <li>
                                        <Link to="privacy">Privacy Policy</Link>
                                    </li> 
                                    <li>
                                        <Link to="/login?redirect=artwork/new">
                                            Upload Artwork
                                        </Link>
                                    </li>            
                                </ul>
                            </li>
                                        
                        </ul>    

                    </div>    

                </div>
        
                <div className="container">  

                    <div className="wrapper">    

                        <nav> 
                            <ul className="parent">
                                <li>
                                    <div className="icons">  
                                        <Social />
                                    </div>    
                                </li>  
                                <li>
                                    <div className="logo">
                                        <Link to="/">
                                            <img src="/images/logoLight100.png" alt="Logo" />
                                        </Link>
                                    </div>    
                                </li>  
                            </ul>                         
                        </nav>  

                    </div>   

                </div>

                <small>Copyright &copy; <b>{process.env.REACT_APP_SITE_NAME}</b> <span className="primary-color">{new Date().getFullYear()}</span>. All Rights Reserved.</small>
                
            </footer>

            <ScrollToTop 
            smooth 
            style={{ background: 'none', boxShadow: 'none' }} 
            component={<ArrowCircleUpIcon color="primary" fontSize="large" />} 
            />

        </Fragment>

    )
    
}

export default Footer
