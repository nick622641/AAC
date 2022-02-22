import React, { Fragment, useEffect } from 'react'
import { getCalloutProducts, getRandomProducts, getRandomProductsDetails } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from './layouts/MetaData'
import Callout from './layouts/images/Callout'
import Social from './layouts/Social'
import Slideshow from './layouts/images/Slideshow'
import Carousel from './layouts/images/Carousel'

const Home = () => {  
    
    const dispatch = useDispatch()
    const { randomProducts        } = useSelector( state => state.randomProducts )
    const { calloutProducts       } = useSelector( state => state.products )          
    const { randomProductsDetails } = useSelector( state => state.randomProductsDetails )          

    useEffect(() => {  

        dispatch(getCalloutProducts())
        dispatch(getRandomProducts(12))       
        dispatch(getRandomProductsDetails(8))       

    }, [dispatch])

    return (

        <Fragment>

            <MetaData title={'Home'} />             

            {randomProducts && randomProducts.length > 0 && (
                <Slideshow data={randomProducts} />               
            )}          

            <div className="container">

                <div className="wrapper">  

                    <div className="parent">
                        <div className="col-6">
                            <img src="https://res.cloudinary.com/marine-graphics/image/upload/v1640544376/products/ccjfh4na1pvylu8cilvp.jpg" alt="" />
                        </div>
                        <div className="parent col-6 wrapper callout">
                            <h3>BROWSE THE COLLECTION</h3>

                            <h2>Latest Work</h2>

                            <p>Striking and affordable original works of abstract art by global artists. Inspired in Canada, driven by emotion and powered by colour and texture.</p>
                         
                            <br />

                            <Link className="submit chevron-hover" to="/artwork/the-waiting">
                                Shop Now 
                            </Link>
                        </div>
                    </div>   
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
            
            <section 
                style={{ backgroundImage: "url(https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/08/Songs-P2448_01.jpg?fit=1920%2C957&ssl=1)" }}
                className="background-cover"
            >
                <div className="wrapper callout parent">
                    <h3>Quentin Caron</h3>
                    <h2>Songs-P2448_01</h2>
                    <p>From his Songs series, Songs-P2448_01, artist Quentin Caron describes each as "an abstract, playful and surreal contemporary painting." Quentin creates each one as a poem.</p>

                    <br />

                    <Link className="submit chevron-hover" to="/artwork/songs-p2448-01">
                        Explore
                    </Link>
                </div>
            </section>

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
