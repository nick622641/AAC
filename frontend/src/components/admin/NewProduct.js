import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { newProduct, clearErrors } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import { getMedia, getOrientations, getArtists } from '../../actions/categoryActions'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import RichText from '../layouts/RichText'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import CircularProgress from '@mui/material/CircularProgress'

const NewProduct = () => {

    const [ name,          setName          ] = useState('')
    const [ price,         setPrice         ] = useState(0)
    const [ width,         setWidth         ] = useState(0)
    const [ height,        setHeight        ] = useState(0)
    const [ depth,         setDepth         ] = useState(0)
    const [ description,   setDescription   ] = useState('Please enter a comprehensive description')
    const [ artist,        setArtist        ] = useState('')
    const [ orientation,   setOrientation   ] = useState('')
    const [ medium,        setMedium        ] = useState('')
    const [ stock,         setStock         ] = useState(0)
    const [ datePublished, setDatePublished ] = useState('')
    const [ images,        setImages        ] = useState([])
    const [ imagesPreview, setImagesPreview ] = useState([])

    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error, success } = useSelector( state => state.newProduct )
    const { media                   } = useSelector( state => state.media )
    const { orientations            } = useSelector( state => state.orientations )
    const { artists                 } = useSelector( state => state.artists )

    useEffect(() => {
        
        dispatch(getMedia())        
        dispatch(getOrientations())        
        dispatch(getArtists())        

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {            
            alert.success('Product created successfully')
            dispatch({ type: NEW_PRODUCT_RESET })
            navigate('/admin/products')
        }
    }, [dispatch, alert, error, success, navigate])

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
        dispatch(newProduct(formData))
    }

    const onChange = (e) => {
        
        const files = Array.from(e.target.files)
        setImagesPreview([])
        setImages([])
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })   
    }   

    return (

        <Fragment>

            <MetaData title={'New Product'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article>          
                            
                        <div className="user-form cart upload-product"> 

                            <form onSubmit={submitHandler} encType='multipart/form-data'>

                                <input
                                    className="add-product-title"
                                    placeholder="Artwork title"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                                />

                                <div className="parent reverse">

                                    <label>                                        
                                        <input
                                            type="file"   
                                            name="product_images"                            
                                            onChange={onChange}   
                                            multiple                              
                                        /> 
                                        <Avatar
                                            src={imagesPreview[0] ? imagesPreview[0] : '/images/default-product.jpg'} 
                                            alt='Avatar Preview' 
                                            sx={{ width: 150, height: 150 }}
                                        /> 
                                    </label> 

                                    <table className="middle-align">
                                    <tbody> 

                                        <tr>                                          
                                            <th><h6>Stock</h6></th>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={stock} 
                                                    onChange={(e) => setStock(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><h6>$ CAD</h6></th>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)} 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><h6>Published</h6></th>
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
                                {imagesPreview.length > 0 && (
                                    <ul className="thumbnails">

                                    {imagesPreview.map(img => (
                                        <li key={img} >
                                            <img                                             
                                                src={img}                                             
                                                alt="Images Preview"  
                                                className="centered-image"                                       
                                            />
                                        </li>
                                    ))}  
    
                                    </ul> 
                                )}
                                  

                                <div>
                                    <h4>Dimensions <small className="primary-color">&bull; (cm)</small></h4>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <th>
                                                <h6>Width</h6>
                                            </th>                                            
                                            <td>                                                
                                                <input
                                                    type="number"
                                                    value={width}
                                                    onChange={(e) => setWidth(e.target.value)} 
                                                    min="0"
                                                />
                                            </td>
                                            <th>
                                            <h6>Height</h6>
                                            </th>
                                            <td>                                                
                                                <input
                                                    type="number"
                                                    value={height}
                                                    onChange={(e) => setHeight(e.target.value)} 
                                                    min="0"
                                                />
                                            </td>
                                            <th>
                                            <h6>Depth</h6>
                                            </th>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={depth}
                                                    onChange={(e) => setDepth(e.target.value)} 
                                                    min="0"
                                                />
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <h4>Categories</h4>
                                    <table className="fixed-table categories">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: "100px" }}>
                                                    <h6>Artist</h6>
                                                </th>
                                                <td>
                                                    <select 
                                                        value={artist}
                                                        onChange={(e) => setArtist(e.target.value)}                                    >
                                                        <option value="">Select an artist</option>

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
                                                        onChange={(e) => setOrientation(e.target.value)}                                    
                                                    >
                                                        <option value="">Select an orientation</option>

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
                                                        <option value="">Select a medium</option>

                                                        {media && media.map(m => (
                                                            <option key={m._id} value={m.name}>{m.name}</option>
                                                        ))}  
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>  
                                </div>   

                                <h4>Description</h4> 
                                
                                <RichText 
                                    text={description}
                                    setText={setDescription}
                                />

                                <br /><br />    

                                <button
                                    className="submit"
                                    disabled={loading ? true : false}
                                >
                                    {loading 
                                        ? <CircularProgress color="primary" />
                                        : 'CREATE'
                                    }
                                </button>

                            </form>

                            <Link to="/dashboard">
                                <Fab size="small" className="close" color="primary">
                                    <CloseIcon />
                                </Fab>
                            </Link>
                        </div>
                        
                    </article>

                </div>

            </div>
            
        </Fragment>
    )
}

export default NewProduct
