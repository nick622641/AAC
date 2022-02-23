import React, { Fragment, useEffect } from 'react'
import { getCalloutProducts, getLatestProduct, getRandomProducts, getRandomProductsDetails, getRandomProduct } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from './layouts/MetaData'
import Callout from './layouts/images/Callout'
import Social from './layouts/Social'
import Slideshow from './layouts/images/Slideshow'
import Carousel from './layouts/images/Carousel'
import Banner from './layouts/images/Banner'
import Latest from './layouts/images/Latest'

const Home = () => {  
    
    const dispatch = useDispatch()
    const { randomProducts        } = useSelector( state => state.randomProducts )
    const { calloutProducts       } = useSelector( state => state.products )          
    const { randomProductsDetails } = useSelector( state => state.randomProductsDetails )          
    const { randomProduct         } = useSelector( state => state.randomProduct )
    const { latestProduct         } = useSelector( state => state.latestProduct )

    useEffect(() => {  

        dispatch(getCalloutProducts())
        dispatch(getRandomProducts(12))       
        dispatch(getRandomProductsDetails(8))       
        dispatch(getRandomProduct())       
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
            
            {randomProduct && randomProduct.length > 0 && (
                <Banner product={randomProduct} />
            )} 
           
            {randomProductsDetails && randomProductsDetails.length > 0 && (
                <Carousel data={randomProductsDetails} />       
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
