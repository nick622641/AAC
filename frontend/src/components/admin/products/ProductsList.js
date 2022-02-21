import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getAdminProducts, deleteProduct, clearErrors } from '../../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../../constants/productConstants'
import MetaData from '../../layouts/MetaData'
import Loader from '../../layouts/Loader'
import Sidebar from '../Sidebar'
import Modal from '../../modals/Modal'
import Confirm from '../../modals/Confirm'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Avatar from '@mui/material/Avatar'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Tooltip } from '@mui/material';

const ProductsList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, products, productsCount } = useSelector( state => state.products )
    const { loading: isLoading, error: deleteError, isDeleted } = useSelector( state => state.product  )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,              setId             ] = useState('')
    const [ fullscreen,      setFullscreen     ] = useState(false)

    useEffect(() => {

        dispatch(getAdminProducts())

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if(isDeleted) {
            alert.success('Artwork Deleted Successfully')    
            dispatch({ type: DELETE_PRODUCT_RESET })            
        }
        
    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }    

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'Preview',
                    field: 'url',
                    sort: 'disabled',
                    width: 75
                },          
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                    width: 150                
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 100
                },  
                {
                    label: 'Artist',
                    field: 'artist',
                    sort: 'asc',
                    width: 100
                },   
                {
                    label: 'Reviews',
                    field: 'reviews',
                    sort: 'asc',
                    width: 90
                },             
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc',
                    width: 90
                }                
            ],
            rows: []
        }
       
        products && products.forEach( product => {         
            data.rows.push({
                url: <Link to={`/artwork/${product.slug}`}>
                        <Avatar
                            src={product.images[0].thumbUrl} 
                            alt={product.name} 
                            sx={{ width: 50, height: 50 }}
                        />          
                    </Link>,            
                actions: 
                <Fragment>                    
                    <CopyToClipboard text={product._id}>
                        <IconButton 
                            onClick={() => alert.success('ID Copied')} 
                            title="Copy ID"
                        >
                            <ContentCopyIcon color="primary" />  
                        </IconButton>                      
                    </CopyToClipboard>  
                    <Link to={`/admin/product/${product._id}`}>
                        <IconButton title="Edit Page">
                            <EditOutlinedIcon />
                        </IconButton>
                    </Link> 
                    <IconButton 
                         onClick={() => {
                            setIsModalVisible(!isModalVisible)
                            setId(product._id)
                        }}
                        title="Delete Page"
                    >
                        <DeleteOutlineIcon color="danger" />
                    </IconButton>  
                </Fragment>, 
                name: product.name,
                artist: product.artist,
                reviews: product.numOfReviews,
                stock: product.stock                
            })
        })

        return data
    }   

    return (

        <Fragment>

            <MetaData title={'All Products'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>

                        <Sidebar />

                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>

                        {loading || isLoading ? <Loader /> : (

                            <Fragment>  

                                <div className="user-form cart">

                                    <h1>All Artwork <small>{productsCount}</small></h1>                                                                
                                
                                    <MDBDataTableV5 
                                        data={setProducts()}   
                                        fullPagination   
                                        scrollX  
                                        searchTop
                                        searchBottom={false}  
                                    />                                 

                                    <Link to="/admin/dashboard">
                                        <Fab 
                                            size="small" 
                                            className="close" 
                                            color="primary"
                                            sx={{ position: 'absolute', top: 10, right: 10 }}
                                        >
                                            <CloseIcon />
                                        </Fab>
                                    </Link>

                                    <Tooltip title="Expand">
                                        <IconButton 
                                            color="primary" 
                                            sx={{ position: 'absolute', top: 10, left: 10 }}
                                            onClick={() => setFullscreen(!fullscreen)}
                                        >
                                            <FitScreenIcon />
                                        </IconButton>
                                    </Tooltip>

                                </div>

                            </Fragment>

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
                        onConfirm={() => deleteProductHandler(id)} 
                        message="Delete artwork"
                    />
                }
            />
            
        </Fragment>

    )

}

export default ProductsList
