import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layouts/MetaData'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import { getArtists, getMedia, getOrientations } from '../actions/categoryActions'
import { Link, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Product from './product/Product'
import Loader from './layouts/Loader'
import { useMediaQuery } from 'react-responsive'
import { useSpring, animated } from 'react-spring'
import 'rc-slider/assets/index.css'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Gallery = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ price, setPrice ] = useState([1, 5000])
    const [ artist, setArtist ] = useState('')
    const [ medium, setMedium ] = useState('')
    const [ orientation, setOrientation ] = useState('')
    const [ rating, setRating] = useState(0)
    const [ isMenuOpen, setIsMenuOpen] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const keyword = useParams().keyword  
    const { artists } = useSelector(state => state.artists)
    const { media } = useSelector(state => state.media)
    const { orientations } = useSelector(state => state.orientations)   

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector( state => state.products )

    const menuAppear = useSpring({
        transform: isMenuOpen && isMobile ? 'translateX(0)' : 'translateX(-100%)'
    })

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
 
    if(keyword || artist || medium || orientation || price[0] !== 1 || price[1] !== 5000 || rating !== 0) {
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
                        >Show Menu</button>

                        {(isMenuOpen || !isMobile) && (
                        <animated.div style={isMobile ? menuAppear : {}}>

                            <h3>Filters</h3>                                

                            <h6>Artist</h6>

                            <ul className="list-style">                                    
                                <li className={keyword || artist || orientation || medium || price[0] !== 1 || price[1] !== 5000 || rating !== 0 ? '' : 'link-active'}>
                                    <small>
                                    <Link to="/gallery">
                                        {keyword || artist || orientation || medium || price[0] !== 1 || price[1] !== 5000 || rating !== 0 ? 'Reset Filters' : 'All the Work'}
                                        
                                    </Link>
                                    </small>                                            
                                </li>
                                {artists && artists.map(a => (
                                <li                                           
                                    key={a.name}
                                    onClick={(e) => {
                                        setArtist(a.name) 
                                        setOrientation('')
                                        setMedium('')
                                        setCurrentPage(1)
                                        setRating(0)
                                        setPrice([1, 5000])
                                        window.scrollTo(0, 0)
                                    }}
                                    className={artist && artist === a.name ? 'link-active' : ''}
                                >
                                    {a.name}
                                </li>
                                ))}
                            </ul>

                            <h6>Orientation</h6>

                            <ul className="list-style">
                                {orientations && orientations.map(o => (
                                <li                                           
                                    key={o.name}
                                    onClick={() => {
                                        setOrientation(o.name)
                                        setArtist('')
                                        setMedium('')
                                        setCurrentPage(1)
                                        setRating(0)
                                        setPrice([1, 5000])
                                        window.scrollTo(0, 0)
                                    }}
                                    className={orientation && orientation === o.name ? 'link-active' : ''}
                                >
                                    {o.name}
                                </li>
                                ))}
                            </ul>

                            <h6>Media</h6>

                            <ul className="list-style">
                                {media && media.map(m => (
                                <li                                           
                                    key={m.name}
                                    onClick={() => {
                                        setMedium(m.name)
                                        setOrientation('')
                                        setArtist('')
                                        setCurrentPage(1)
                                        setRating(0)
                                        setPrice([1, 5000])
                                        window.scrollTo(0, 0)
                                    }}
                                    className={medium && medium === m.name ? 'link-active' : ''}

                                >
                                    {m.name}
                                </li>
                                ))}
                            </ul>

                            <h6>Price Range</h6>

                            <Range 
                                marks={{
                                    1 : `$1`,
                                    5000 : `$5000`
                                }}
                                min={1}
                                max={5000}
                                defaultValue={[1, 5000]}
                                tipFormatter={value => `$${value}`}
                                tipProps={{
                                    placement: "top"                                                    
                                }}
                                value={price}
                                onChange={(price) => {
                                    setPrice(price)
                                    setCurrentPage(1)
                                    setRating(0)
                                    window.scrollTo(0, 0)}}
                            />

                            <h6>Ratings</h6>

                            <ul>
                                {[5, 4, 3, 2, 1].map(star => (
                                    <li
                                        style={{cursor: 'pointer', listStyleType: 'none'}}
                                        key={star}
                                        onClick={() => {
                                            setRating(star)
                                            setCurrentPage(1)
                                            setPrice([1, 5000])
                                            window.scrollTo(0, 0)}}
                                    >
                                        <div className="rating-outer">
                                            <div className="rating-inner"
                                                style={{
                                                    width: `${star * 20}%`                                                       
                                                }}
                                            >

                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <button 
                                className="filters"
                                onClick={() => {setIsMenuOpen(!isMenuOpen); window.scrollTo(0, 0)}}
                            >Hide Menu</button>

                        </animated.div>
                        )} 

                    </aside>

                    <article>  

                        {loading ? <Loader /> : ( 

                        <Fragment>

                        <h1>
                            {!keyword && !artist && !orientation && !medium ? 'All the Work' : ''}
                            { keyword && !artist && !orientation && !medium ? 'Results for: ' + keyword : ''}
                            {artist ? artist : ''}
                            {orientation ? orientation : ''}
                            {medium ? medium : ''}
                            <small>
                                {rating ? ' Ratings ' + rating + ' - 5': ''}
                            </small>
                            <small>&nbsp;
                                {price[0] > 1 || price[1] < 5000 ? ' From $' + price[0] + ' to $' + price[1]: ''}
                            </small>

                            <small style={{ float: "right" }}>
                                {resPerPage * (currentPage - 1) + 1} 
                                &nbsp;-&nbsp; 
                                {resPerPage * currentPage > count ? count : resPerPage * currentPage} 
                                <b>&nbsp;&nbsp;/&nbsp;</b> {count}
                            </small>                          
                        </h1>

                        <div className="showroom">

                            {products && count > 0 ?  products.map(product => (

                                <Product key={product._id} product={product} />
                                
                            )) : <p>No Results Found</p>}                                

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
