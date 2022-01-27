import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateProduct, getProductDetails, updateImages, deleteImage, clearErrors } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import { DELETE_IMAGE_RESET } from '../../constants/productConstants'
import { getMedia, getOrientations, getArtists } from '../../actions/categoryActions'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import MetaData from '../layouts/MetaData'
import Sidebar from '../admin/Sidebar'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'
import Loader from '../layouts/Loader'

const UpdateProduct = () => {
    
    const [ name,            setName           ] = useState('')
    const [ price,           setPrice          ] = useState(0)
    const [ width,           setWidth          ] = useState(0)
    const [ height,          setHeight         ] = useState(0)
    const [ depth,           setDepth          ] = useState(0)
    const [ description,     setDescription    ] = useState('')
    const [ artist,          setArtist         ] = useState('')
    const [ orientation,     setOrientation    ] = useState('')
    const [ medium,          setMedium         ] = useState('')
    const [ stock,           setStock          ] = useState(0)
    const [ datePublished,   setDatePublished  ] = useState('')
    const [ images,          setImages         ] = useState([])   
    const [ oldImages,       setOldImages      ] = useState([])
    const [ imagesPreview,   setImagesPreview  ] = useState([])   
    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ imgIndex,        setImageIndex     ] = useState('')
    const [ imgId,           setImageId        ] = useState('')
    const [ init,            setInit           ] = useState(0)
    const [ final,           setFinal          ] = useState(0)

    const alert = useAlert()
    const productId = useParams().id   
    const navigate = useNavigate()    
    const dispatch = useDispatch()
    const { error, product                         } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated, error: deleteError, isDeleted } = useSelector(state => state.product)
    const { media                                  } = useSelector(state => state.media)
    const { orientations                           } = useSelector(state => state.orientations)
    const { artists                                } = useSelector(state => state.artists)

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

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
            alert.success('Artwork Updated Successfully')
            dispatch(getProductDetails(productId))  
            dispatch({ type: UPDATE_PRODUCT_RESET })           
        }
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if(isDeleted) {
            alert.success('Image Deleted Successfully') 
            dispatch(getProductDetails(productId))    
            dispatch({ type: DELETE_IMAGE_RESET })            
        }
    }, [dispatch, navigate, product, productId, alert, error, isUpdated, updateError, isDeleted, deleteError])

    const submitHandler = (e) => {

        window.scrollTo(0,0)
        setImagesPreview([])

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

    const deleteImageHandler = (id, imgIndex, imgId) => {
        dispatch(deleteImage(id, imgIndex, imgId))
    }  
    const updateImagesHandler = (id, initPos, finPos) => {
        dispatch(updateImages(id, initPos, finPos))
    }   

    const dragStartHandler = (el) => {
        const container = document.querySelector('.dragContainer')
        el.classList.add('dragging')
        for (let i = 0; i < container.children.length; i++) {
            if (container.children[i].classList.contains('dragging')) {
                setInit(i)
            }            
        }         
    }
    const dragEndHandler = (el) => {
        el.classList.remove('dragging')
        updateImagesHandler(productId, init, final)  
    }
    const handleContainerDrag = (e) => {
        
        e.preventDefault()
        const container = document.querySelector('.dragContainer')
        const draggable = document.querySelector('.dragging')
        const afterElement = getDragAfterElement(e.clientX)
        for (let i = 0; i < container.children.length; i++) {
            if (container.children[i].classList.contains('dragging')) {
                setFinal(i)
            }            
        }        
        if (afterElement === null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        } 
    }

    const getDragAfterElement = (x) => {
        const container = document.querySelector('.dragContainer')
        const draggableElements = [ ...container.querySelectorAll('.draggable:not(.dragging)')]

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = x - box.left - box.width / 2
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest 
            }

        }, {offset: Number.NEGATIVE_INFINITY}).element
    }
 
    return (

        <Fragment>

            <MetaData title={'Update Product'} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                    
                    </aside>            

                    <article className="relative"> 

                        {loading ? <Loader /> : (                       

                            <div className="user-form cart upload-product"> 

                                <form onSubmit={submitHandler} encType='multipart/form-data'>

                                    <input
                                        className="primary-color"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} 
                                        style={{ fontSize: '32px', padding: 0 }}
                                    />

                                    <br /><br />

                                    <div className="parent reverse">
                                        
                                        <label>                                    
                                            <input
                                                type='file'   
                                                className="hidden-input"
                                                name="product_images"                            
                                                onChange={onChange}   
                                                multiple                              
                                            />   
                                                                 
                                            {oldImages[0] && !imagesPreview[0]  && (
                                                <Avatar
                                                    src={oldImages[0].thumbUrl} 
                                                    alt={name}
                                                    sx={{ width: 150, height: 150 }}
                                                />                                   
                                            )}   
                                            {imagesPreview[0] && (
                                                <Avatar
                                                    src={imagesPreview[0]} 
                                                    alt={name}
                                                    sx={{ width: 150, height: 150 }}
                                                />                                           
                                            )}                                            
                                                
                                        </label>
                                        
                                        <table className="middle-align">
                                        <tbody>  
                                            <tr>                                            
                                                <th>
                                                    <h6 className="text-right">Stock</h6>
                                                </th>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={stock} 
                                                        onChange={(e) => setStock(e.target.value)}
                                                        min="0"
                                                    />                                     
                                                </td> 
                                            </tr> 
                                            <tr>
                                                <th>
                                                    <h6 className="text-right">$ CAD</h6>
                                                </th>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)} 
                                                        min="0"
                                                    />  
                                                </td>                                         
                                            </tr>
                                            <tr>
                                                <th>
                                                    <h6 className="text-right">Published</h6>
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

                                    <br />                                  
                                  
                                    <ul onDragOver={handleContainerDrag} className="dragContainer d-flex">                          
                                       
                                        {oldImages && oldImages.map((img, index) => (                                                                                      
                                            
                                            <li 
                                                key={img._id} 
                                                className="relative draggable round background-cover" 
                                                draggable="true"
                                                onDragStart={(e) => dragStartHandler(e.target)}
                                                onDragEnd={(e) => dragEndHandler(e.target)}
                                                style={{ marginRight: '10px', width: '40px', height: '40px', backgroundImage: `url(${img.thumbUrl})` }}
                                            >                                               
                                                <IconButton 
                                                    onClick={() => {
                                                        setIsModalVisible(!isModalVisible)   
                                                        setImageIndex(index)  
                                                        setImageId(img._id)                                               
                                                    }}
                                                    sx={{ position: 'absolute', top: 0, right: 0 }}                                                
                                                >
                                                    <DeleteOutlineIcon sx={{ color: '#ccc' }} />
                                                </IconButton>
                                            </li>                                           
                                        ))}

                                        {imagesPreview.map((img, i) => (                                           
                                            <li 
                                                key={i} 
                                                className="relative round background-cover" 
                                                style={{ marginRight: '10px', width: '40px', height: '40px', backgroundImage: `url(${img})` }}
                                            />                                           
                                        ))}
                                    </ul>                                      

                                    <div>
                                        <h4>Dimensions <small>&bull; (cm)</small></h4>
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
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        <h6 className="text-right">Artist</h6>
                                                    </th>
                                                    <td>
                                                        <select 
                                                            value={artist}
                                                            onChange={(e) => setArtist(e.target.value)}                                    
                                                        >
                                                            {artists && artists.map(a => (
                                                                <option key={a._id} value={a.name}>{a.name}</option>
                                                            ))}   
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h6 className="text-right">Orientation</h6>
                                                    </th>
                                                    <td>
                                                        <select 
                                                            value={orientation}
                                                            onChange={(e) => setOrientation(e.target.value)}
                                                        >

                                                            {orientations && orientations.map(o => (
                                                                <option key={o._id} value={o.name}>{o.name}</option>
                                                            ))}  
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h6 className="text-right">Media</h6>
                                                    </th>
                                                    <td>
                                                        <select 
                                                            value={medium}
                                                            onChange={(e) => setMedium(e.target.value)}                                    
                                                        >
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
                                    {description && (                                 
                                        <CKEditor
                                            editor={ClassicEditor}               
                                            data={description}
                                            onChange={(event, editor) => {
                                                const data = editor.getData()
                                                setDescription(data)
                                            }}
                                        />
                                    )}                                
                        
                                    <br /><br />  
                                    
                                    <button
                                        className="submit"
                                        disabled={loading ? true : false}
                                    >
                                        {loading 
                                            ? <CircularProgress color="primary" />
                                            : 'Update'
                                        }
                                    </button>

                                </form>                            

                                <Fab 
                                    size="small" 
                                    className="close" 
                                    color="primary"
                                    onClick={() => navigate(-1)} 
                                    sx={{ position: 'absolute', top: 10, right: 10 }}
                                >
                                    <CloseIcon />
                                </Fab>

                            </div>

                        )}

                    </article>

                </div>

            </div>   

            <Modal
                isModalVisible={isModalVisible} 
                onBackdropClick={toggleModal}   
                content={
                    <Confirm 
                        onBackdropClick={toggleModal} 
                        onConfirm={() => deleteImageHandler(productId, imgIndex, imgId)} 
                        message="Delete Image"
                    />
                }
            /> 

        </Fragment>
    )

}


export default UpdateProduct
