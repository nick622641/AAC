import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useMediaQuery } from 'react-responsive'
import { useSpring, animated } from 'react-spring'
import { getProducts } from '../actions/productActions'
import { getArtists, getMedia, getOrientations } from '../actions/categoryActions'
import MetaData from './layouts/MetaData'
import Product from './product/Product'
import Loader from './layouts/Loader'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Gallery = () => {

    const alert    = useAlert()
    const dispatch = useDispatch()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const keyword  = useParams().keyword    
    const artistQuery      = useParams().artist 
    const orientationQuery = useParams().orientation 
    const mediumQuery      = useParams().medium 
    const ratingQuery      = useParams().rating 
    const artist      = artistQuery      ? artistQuery.replace(/-/g, ' ')      : ''
    const orientation = orientationQuery ? orientationQuery.replace(/-/g, ' ') : ''
    const medium      = mediumQuery      ? mediumQuery.replace(/-/g, ' ')      : ''
    const rating      = ratingQuery      ? ratingQuery.replace(/-/g, ' ')      : ''   

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ price,       setPrice       ] = useState([1, 10000])    
    const [ isMenuOpen,  setIsMenuOpen  ] = useState(false)   

    const { artists      } = useSelector( state => state.artists )
    const { media        } = useSelector( state => state.media )
    const { orientations } = useSelector( state => state.orientations )  
    const { loading, products, productsCount, resPerPage, filteredProductsCount, error } = useSelector( state => state.products )

    const menuAppear = useSpring({
        transform: isMenuOpen && isMobile ? 'translateX(0)' : 'translateX(-100%)'
    })

    const resetPage = () => {
        setCurrentPage(1)
        setIsMenuOpen(false)
        window.scrollTo(0, 0)           
    }

    useEffect( () => {
        dispatch(getArtists())
        dispatch(getMedia())
        dispatch(getOrientations())
        if(error) {
            return alert.error(error)        
        }         
        dispatch(getProducts(keyword, currentPage, price, artist, orientation, medium, rating))    

    }, [dispatch, alert, error, keyword, currentPage, price, artist, orientation, medium, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount
 
    if(keyword || artist || medium || orientation || price[0] > 1 || price[1] < 10000 || rating > 0) {
        count = filteredProductsCount          
    }   

    return (       

        <Fragment>

            <MetaData title={'Gallery'} />        

            <div className="container">

                <div className="wrapper parent">  

                    <aside>

                        <button 
                            className="filters"
                            onClick={() => {setIsMenuOpen(!isMenuOpen)}}
                        >
                            Show Menu
                        </button>

                        {(isMenuOpen || !isMobile) && (
                        <animated.div style={isMobile ? menuAppear : {}}>

                            <h3>
                                Filters &nbsp; &nbsp;
                                <Link to="/gallery">
                                    <i className="fa fa-refresh" style={{ margin: 0 }} />
                                </Link>
                            </h3>    

                            <h6>Price Range</h6>

                            <Range 
                                marks={{
                                    1 : `$1`,
                                    10000 : `$10000`
                                }}
                                min={1}
                                max={10000}
                                defaultValue={[1, 10000]}
                                tipFormatter={value => `$${value}`}
                                tipProps={{
                                    placement: "top"                                                    
                                }}
                                value={price}
                                onChange={(price) => {
                                    setPrice(price)                          
                                    resetPage()
                                }}
                            />                            

                            <h6>Artist</h6>

                            <ul className="list-style">   
                                {artists && artists.map(a => (
                                    <li                                           
                                        key={a.name}                             
                                        className={artist === a.name ? 'link-active' : ''}
                                    >                                        
                                        <Link to={`/gallery/artist/${a.name.replace(/ /g, '-')}`}>{a.name}</Link>
                                    </li>
                                ))}
                            </ul>

                            <h6>Orientation</h6>

                            <ul className="list-style">
                                {orientations && orientations.map(o => (
                                <li                                           
                                    key={o.name}                               
                                    className={orientation === o.name ? 'link-active' : ''}
                                >
                                    <Link to={`/gallery/orientation/${o.name.replace(/ /g, '-')}`}>{o.name}</Link>
                                </li>
                                ))}
                            </ul>

                            <h6>Media</h6>

                            <ul className="list-style">
                                {media && media.map(m => (
                                <li                                           
                                    key={m.name}                                    
                                    className={medium && medium === m.name ? 'link-active' : ''}
                                >
                                    <Link to={`/gallery/medium/${m.name.replace(/ /g, '-')}`}>{m.name}</Link>
                                </li>
                                ))}
                            </ul>                            

                            <h6>Ratings</h6>

                            <ul>
                                {[5, 4, 3, 2, 1].map(star => (
                                    <li
                                        style={{cursor: 'pointer', listStyleType: 'none'}}
                                        key={star}                                
                                    >
                                        <Link to={`/gallery/rating/${star}`}>
                                            <div className="rating-outer">
                                                <div 
                                                    className="rating-inner"
                                                    style={{ width: `${star * 20}%` }}
                                                />
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <button 
                                className="filters"
                                onClick={resetPage}
                            >
                                Hide Menu
                            </button>

                        </animated.div>
                        )} 

                    </aside>

                    <article>  

                        {loading ? <Loader /> : ( 

                        <Fragment>

                        <h1>
                            {!keyword && !artist && !orientation && !medium && !rating && (price[0]=== 1 && price[1] === 10000) ? 'All the Work' : ''}
                            { keyword && !artist && !orientation && !medium && !rating && (price[0]=== 1 && price[1] === 10000) ? 'Results for: ' + keyword : ''}
                            { artist      ? artist      : ''}
                            { orientation ? orientation : ''}
                            { medium      ? medium      : ''}                            
                            { rating      ? ' Ratings ' + rating + ' - 5': ''}   
                            <small 
                                style={{ 
                                    fontSize: artist || orientation || medium || rating ? "" : "inherit"
                                }}
                            >
                                { price[0] > 1 || price[1] < 10000 ? ' From $' + price[0] + ' to $' + price[1]: ''}                        
                            </small> 
                            <small className="float-r">
                                {resPerPage * (currentPage - 1) + 1} 
                                &nbsp;-&nbsp; 
                                {resPerPage * currentPage > count ? count : resPerPage * currentPage} 
                                &nbsp;&nbsp;/&nbsp; {count}
                            </small>                          
                        </h1>

                        <div className="showroom">
                            {products && count > 0                             
                                ?   products.map(product => (
                                        <Product key={product._id} product={product} />                                    
                                    )) 
                                :   <p>No Results Found</p>
                            }    
                        </div>

                        {resPerPage <= count && (
                            <div onClick={() => window.scrollTo(0, 0)}>
                                <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={count}                        
                                onChange={setCurrentPageNo}   
                                nextPageText={'⟩'}  
                                prevPageText={'⟨'} 
                                firstPageText={'«'} 
                                lastPageText={'»'}  
                                />
                            </div>
                        )} 

                        </Fragment>

                        )}

                    </article> 

                </div>

            </div>    

        </Fragment>       

    )

}

export default Gallery
