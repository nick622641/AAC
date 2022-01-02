import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {


    return (

        <footer>

            <div className="container">                
                <div className="wrapper">

                    <nav>        
                        <ul>
                       
                            <li>
                                <span>Galleries</span>
                                <ul>                               
                               
                                    <li>
                                        <Link to="/gallery">All the Work</Link>
                                    </li> 
                                                      
                                </ul>
                            </li>

                            <li>
                                <span>Technical</span>
                                <ul>                               
                               
                                    <li>
                                        <Link to="/terms">Terms & Conditions</Link>
                                    </li> 
                                    <li>
                                        <Link to="privacy">Privacy Policy</Link>
                                    </li>            
                                </ul>
                            </li>
                                     
                        </ul>    
                    </nav>   
                </div>                
            </div>
    
            <div className="container">            
                <div className="wrapper">            
                    <nav> 
                        <ul>
                            <li>
                            <div className="icons">  
                                <Link to="!#" target="_blank">
                                    <i className="fa fa-facebook facebook" aria-hidden="true"></i>
                                </Link>
                                <Link to="!#" target="_blank">
                                    <i className="fa fa-twitter" aria-hidden="true"></i>
                                </Link>
                            </div>    
                            </li>  
                            <li>
                                <div className="logo">
                                <Link to="/"><img src="/images/logoLight100.png" alt="Logo" /></Link>
                                </div>    
                            </li>  
                        </ul> 
                    </nav>                
                </div>                
            </div>

            <small>Copyright &copy; <b>{process.env.REACT_APP_SITE_NAME}</b> <span>{new Date().getFullYear()}</span>. All Rights Reserved.</small>
            
        </footer>
    )
}

export default Footer
