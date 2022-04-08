import React, { Fragment, useEffect } from 'react'
import { getCalloutProducts, getLatestProduct, getRandomProducts, getRandomProductsDetails, getRandomProduct } from '../actions/productActions'
import { getRandomBlog } from '../actions/blogActions'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from './layouts/MetaData'
import Callout from './layouts/images/Callout'
import Social from './layouts/Social'
import Slideshow from './layouts/images/Slideshow'
import Carousel from './layouts/images/Carousel'
import Banner from './layouts/images/Banner'
import Latest from './layouts/images/Latest'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import RichtextOutput from './layouts/richtext/RichtextOutput'
import FormattedDate from './layouts/FormattedDate'

const Home = () => {  
    
    const dispatch = useDispatch()
    const { randomProducts        } = useSelector( state => state.randomProducts )
    const { calloutProducts       } = useSelector( state => state.products )          
    const { randomProductsDetails } = useSelector( state => state.randomProductsDetails )          
    const { randomProduct         } = useSelector( state => state.randomProduct )
    const { randomBlog            } = useSelector( state => state.randomBlog )
    const { latestProduct         } = useSelector( state => state.latestProduct )

    useEffect(() => {  

        dispatch(getCalloutProducts())
        dispatch(getRandomProducts(12))       
        dispatch(getRandomProductsDetails(8))       
        dispatch(getRandomProduct(2))       
        dispatch(getRandomBlog(1))       
        dispatch(getLatestProduct())       

    }, [dispatch])

    return (

        <Fragment>

            <MetaData title={'Home'} />             

            {randomProducts && randomProducts.length > 0 && (
                <Slideshow data={randomProducts} />               
            )}          

            <div className="container">

                <div className="wrapper">  

                    <div className="d-flex justify-content-center" style={{ marginBottom: "40px" }}>

                        <Link to="/gallery/orientation/Portrait">
                            <Button variant="outlined" style={{ margin: "0 10px" }}>Portrait</Button>
                        </Link>

                        <Link to="/gallery">
                            <Button variant="outlined" style={{ margin: "0 10px" }}>LATEST ARTWORK</Button>
                        </Link>

                        <Link to="/gallery/orientation/Landscape">
                            <Button variant="outlined" style={{ margin: "0 10px" }}>Landscape</Button>
                        </Link>     

                    </div>
                
                    {latestProduct && latestProduct.length > 0 && (
                        <Latest product={latestProduct[0]} />
                    )}                   

                    <div className="parent" style={{ margin: "80px 0 0 0" }}>
                        <div className="col-6">
                            <h3>Share</h3>

                            <h4>SPREAD THE WORD ABOUT ABSTRACT ART CANADA</h4>

                            <div className="icons">  
                                <Social />
                            </div> 
                        </div>
                        <div className="col-6">
                            <h2>Bold and beautiful abstract works of art by Canadian artists</h2>

                            <p>At Abstract Art Canada, we are committed to providing original art that's accessible and affordable. Beautiful, reasonably priced art that would look perfect in any home or workspace. In various sizes and styles, our artists create art that you can appreciate every day.   The artists at Abstract Art Canada are drawn to bold shapes and colours. They create art with feeling to produce something unique that might leave you reminded of a past experience.   We love creating and we want everyone else to share our love therefore we sell our art at reasonable prices.   Fancy having a go? In addition to selling our art, we offer free online courses for beginners. All you need is a drop of courage and a splash of curiosity.</p>

                        </div>                     
                    </div>  

                </div>
            </div>  

            <div className="container">

                <div className="wrapper">  

                    {randomBlog && randomBlog.length > 0 && (

                        <div className="parent align-items-center">
                            
                            <div className="parent col-6 wrapper callout">
                                <h2>{randomBlog[0].title}</h2>

                                <h6>Posted by {randomBlog[0].name}</h6>

                                <p><FormattedDate iso={randomBlog[0].createdAt} format="date" /></p>

                                <br />

                                <RichtextOutput text={`${randomBlog[0].description.substring(0, 300)}...`} />
                                
                                <br />

                                <Link className="submit chevron-hover" to={`/artwork/${randomBlog[0].slug}`}>
                                    Read More 
                                </Link>
                            </div>

                            <div className="col-6">
                                <img src={randomBlog[0].images[0].url} alt={randomBlog[0].title} />
                            </div>

                        </div> 

                    )}    

                </div>

            </div>        
            
            {randomProduct && randomProduct.length > 0 && (
                <Banner product={randomProduct[0]} />
            )} 
           
            {randomProductsDetails && randomProductsDetails.length > 0 && (
                <Carousel data={randomProductsDetails} />       
            )}     

            {randomProduct && randomProduct.length > 0 && (
                <Banner product={randomProduct[1]} />
            )}             

            {calloutProducts && calloutProducts.length > 2 && (
                <div className="bg-grey">
                    <Callout data={calloutProducts} />  
                </div>                      
            )}

        </Fragment>

    )

}

export default Home
