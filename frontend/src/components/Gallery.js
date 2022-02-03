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
import IconButton from '@mui/material/IconButton'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import Checkbox from '@mui/material/Checkbox'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Rating from '@mui/material/Rating'
import 'rc-slider/assets/index.css'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Gallery = () => {

    const dispatch = useDispatch()
    const alert    = useAlert()    
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
    let title = 'All the Work'
 
    if (keyword || artist || medium || orientation || price[0] > 1 || price[1] < 10000 || rating > 0) {
        count = filteredProductsCount          
    }  
    if ( keyword     ) { title = keyword }
    if ( artist      ) { title = artist }
    if ( orientation ) { title = orientation }
    if ( medium      ) { title = medium }
    if ( rating      ) { title = `Rating ${rating} / 5` }    

    return (       

        <Fragment>

            <MetaData title={`Gallery - ${title}`} />                                      

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
                                Filters
                                <Link to="/gallery">
                                    <IconButton className="float-r">
                                        <AutorenewIcon />
                                    </IconButton>
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
                                style={{ margin: "20px 0 50px 0" }}
                            />                            

                            <h6>Artist</h6>

                            <ul>   
                                {artists && artists.map(a => (
                                    <li                                           
                                        key={a.name}                             
                                        className={artist === a.name ? 'link-active' : ''}
                                    >                                                                          
                                        <Link 
                                            to={`/gallery/artist/${a.name.replace(/ /g, '-')}`}
                                            className="whitespace-nowrap"
                                        >
                                            <Checkbox 
                                                checked={artist === a.name ? true : false} 
                                                size="small"
                                                sx={{ py: 0.3 }}
                                                color="primary"
                                            />                                      
                                            {a.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <h6>Orientation</h6>

                            <ul>
                                {orientations && orientations.map(o => (
                                    <li                                           
                                        key={o.name}                               
                                        className={orientation === o.name ? 'link-active' : ''}
                                    >
                                        <Link to={`/gallery/orientation/${o.name.replace(/ /g, '-')}`}>
                                            <Checkbox 
                                                checked={orientation === o.name ? true : false} 
                                                size="small"
                                                sx={{ py: 0.3 }}
                                                color="primary"
                                            />                                            
                                            {o.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <h6>Media</h6>

                            <ul>
                                {media && media.map(m => (
                                    <li                                           
                                        key={m.name}                                    
                                        className={medium === m.name ? 'link-active' : ''}
                                    >
                                        <Link to={`/gallery/medium/${m.name.replace(/ /g, '-')}`}>
                                            <Checkbox 
                                                checked={medium === m.name ? true : false} 
                                                size="small"
                                                sx={{ py: 0.3 }}
                                                color="primary"
                                            />                                       
                                            {m.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>                            

                            <h6>Ratings</h6>

                            <ul>
                                {[5, 4, 3, 2, 1].map(star => (
                                    <li key={star}>
                                        <Link to={`/gallery/rating/${star}`}>
                                            <Rating 
                                                value={star} 
                                                sx={{ color: "var(--primary-color)" }} 
                                                readOnly
                                            />                                            
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

                    <article className="relative">                         

                        <h1>{title}</h1>

                        {loading ? <Loader /> : (  

                            <Fragment>

                                <div className="parent">
                                    <span>
                                        { price[0] > 1 || price[1] < 10000 ? ' From $' + price[0] + ' to $' + price[1]: ''}                        
                                    </span> 
                                    <small>
                                        {resPerPage * (currentPage - 1) + 1} 
                                        &nbsp;-&nbsp; 
                                        {resPerPage * currentPage > count ? count : resPerPage * currentPage} 
                                        &nbsp;  / &nbsp;{count}
                                    </small> 
                                </div>

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
                                            nextPageText={<KeyboardArrowRightIcon />}  
                                            prevPageText={<KeyboardArrowLeftIcon />} 
                                            firstPageText={<FirstPageIcon />} 
                                            lastPageText={<LastPageIcon />}  
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
