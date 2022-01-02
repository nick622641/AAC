import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { updateProduct, getProductDetails, clearErrors } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import { getMedia, getOrientations, getArtists } from '../../actions/categoryActions'

const UpdateProduct = () => {
    
    const [ name, setName ] = useState('')
    const [ price, setPrice ] = useState(0)
    const [ width, setWidth ] = useState(0)
    const [ height, setHeight ] = useState(0)
    const [ depth, setDepth ] = useState(0)
    const [ description, setDescription ] = useState('')
    const [ artist, setArtist ] = useState('')
    const [ orientation, setOrientation ] = useState('')
    const [ medium, setMedium ] = useState('')
    const [ stock, setStock ] = useState(0)
    const [ datePublished, setDatePublished ] = useState('')
    const [ images, setImages ] = useState([])   
    const [ oldImages, setOldImages ] = useState([])
    const [ imagesPreview, setImagesPreview ] = useState([])   

    const productId = useParams().id
    const alert = useAlert()
    const navigate = useNavigate()    
    const dispatch = useDispatch()
    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product)
    const { media } = useSelector(state => state.media)
    const { orientations } = useSelector(state => state.orientations)
    const { artists } = useSelector(state => state.artists)

    useEffect(() => {
        dispatch(getMedia()) 
        dispatch(getOrientations())    
        dispatch(getArtists())    

        if (product && product._id !== productId) {            
            dispatch(getProductDetails(productId))  
        } else {
            const date = new Date(product.datePublished)
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const createdAt = year + '-' + (month < 10 ? 0 : '') + month + '-' + (day < 10 ? 0 : '') + day
            setName(product.name)
            setPrice(product.price)
            setWidth(product.width)
            setHeight(product.height)
            setDepth(product.depth)
            setDescription(product.description)
            setArtist(product.artist)
            setOrientation(product.orientation)
            setMedium(product.media)
            setDatePublished(createdAt)
            setStock(product.stock)
            setOldImages(product.images)    
        }
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }
        if(isUpdated) {            
            alert.success('Artwork updated successfully')
            navigate('/admin/products')
            dispatch({ type: UPDATE_PRODUCT_RESET })           
        }
    }, [dispatch, navigate, product, productId, alert, error, isUpdated, updateError])

    const submitHandler = (e) => {

        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)
        formData.set('price', price)
        formData.set('width', width)
        formData.set('height', height)
        formData.set('depth', depth)
        formData.set('description', description)
        formData.set('artist', artist)
        formData.set('orientation', orientation)
        formData.set('media', medium)
        formData.set('stock', stock)
        formData.set('datePublished', datePublished)

        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(updateProduct(product._id, formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)
        setImagesPreview([])
        setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }

    return (
        <Fragment>

            <MetaData title={'Update Product'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside><Sidebar /></aside>            

                    <article>

                        <h1>Update Artwork</h1>

                        <div className="user-form cart"> 

                            <form onSubmit={submitHandler} encType='multipart/form-data'>

                                <input
                                    className="add-product-title"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                                />

                                <div className="parent">

                                <label className="avatar">                                    
                                    <input
                                        type='file'   
                                        name="product_images"                            
                                        onChange={onChange}   
                                        multiple                              
                                    />                            
                                    {oldImages[0] && (
                                        <img src={oldImages[0].thumbUrl} alt={name}/>
                                    )}   
                                    {imagesPreview[0] && (
                                        <img src={imagesPreview[0]} alt={name}/>
                                    )}  
                                        
                                </label>  

                                <table className="add-artwork-details">
                                    <tbody>                                        
                                       
                                        <tr>
                                            <th>
                                                <h6>Stock</h6>
                                            </th>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={stock} 
                                                    onChange={(e) => setStock(e.target.value)}
                                                />                                     
                                            </td>                                            
                                        </tr>
                                        <tr>
                                            <th>
                                                <h6>$ CAD</h6>
                                            </th>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)} 
                                                />  
                                            </td>                                         
                                        </tr>
                                        <tr>
                                            <th>
                                                <h6>Published</h6>
                                            </th>
                                            <td>
                                                <input
                                                    type="date"
                                                    value={datePublished}
                                                    onChange={(e) => setDatePublished(e.target.value)} 
                                                />
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>

                            </div>  

                            <div className="preview-thumbnails">                          

                                {oldImages && oldImages.map((img, i) => (
                                    <figure key={i} >
                                        <img key={i} src={img.thumbUrl} alt={img.url} />
                                    </figure>
                                ))}

                                {imagesPreview.map((img, i) => (
                                    <figure key={i} >
                                        <img src={img} alt="Images Preview" />
                                    </figure>
                                ))}

                            </div>  

                            <div>
                                    <h4>Dimesions</h4>
                                    <table className="admin-size-details">
                                        <tbody>
                                        <tr>
                                            <th>
                                                <h6>Width &bull; <small><b>CM</b></small></h6>
                                            </th>                                            
                                            <td>                                                
                                                <input
                                                    type="number"
                                                    placeholder="Width"
                                                    value={width}
                                                    onChange={(e) => setWidth(e.target.value)} 
                                                />                                                
                                            </td>
                                            <th>
                                                <h6>Height &bull; <small><b>CM</b></small></h6>
                                            </th>
                                            <td>                                                
                                                <input
                                                    type="number"
                                                    placeholder="Height"
                                                    value={height}
                                                    onChange={(e) => setHeight(e.target.value)} 
                                                />
                                            </td>
                                            <th>
                                                <h6>Depth &bull; <small><b>CM</b></small></h6>
                                            </th>
                                            <td>
                                                <input
                                                    type="number"
                                                    placeholder="Depth"
                                                    value={depth}
                                                    onChange={(e) => setDepth(e.target.value)} 
                                                />
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <h4>Categories</h4>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <h6>Artist</h6>
                                                </th>
                                                <td>
                                                    <select 
                                                        value={artist}
                                                        onChange={(e) => setArtist(e.target.value)}                                    >
                                                        <option value=""></option>

                                                        {artists && artists.map(a => (
                                                            <option key={a._id} value={a.name}>{a.name}</option>
                                                        ))}   
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <h6>Orientation</h6>
                                                </th>
                                                <td>
                                                    <select 
                                                        value={orientation}
                                                        onChange={(e) => setOrientation(e.target.value)}                                    >
                                                        <option value=""></option>

                                                        {orientations && orientations.map(o => (
                                                            <option key={o._id} value={o.name}>{o.name}</option>
                                                        ))}                                    
                                                        
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <h6>Media</h6>
                                                </th>
                                                <td>
                                                    <select 
                                                        value={medium}
                                                        onChange={(e) => setMedium(e.target.value)}                                    >
                                                        <option value=""></option>

                                                        {media && media.map(m => (
                                                            <option key={m._id} value={m.name}>{m.name}</option>
                                                        ))}  
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>  
                                </div>  

                                <label>
                                    <textarea 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="4"
                                    ></textarea>
                                </label> 
                                <br /> 
                                <br />                              
                    
                                <button
                                    className="submit"
                                    disabled={loading ? true : false}
                                >
                                    {loading ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i> : 'UPDATE'}
                                </button>

                            </form>

                            <Link to="/admin/products"><i className="fa fa-times"></i></Link>

                        </div>

                    </article>

                </div>

            </div>    

        </Fragment>
    )
}


export default UpdateProduct
