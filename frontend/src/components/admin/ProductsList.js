import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from '../admin/Sidebar'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Avatar from '@mui/material/Avatar'

const ProductsList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, products      } = useSelector( state => state.products )
    const { error: deleteError, isDeleted } = useSelector( state => state.product  )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,  setId ] = useState('')

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
                    width: 50
                },
                {
                    label: 'Artwork ID',
                    field: 'id',
                    sort: 'disabled',
                    width: 160
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc',
                    width: 75
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc',
                    width: 75
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                    width: 100                
                }
            ],
            rows: []
        }

        products && products.forEach( product => {
            data.rows.push({
                url: <Link to={`/artwork/${product._id}`}>
                        <Avatar
                            src={product.images[0].thumbUrl} 
                            alt={product.name} 
                            sx={{ width: 50, height: 50 }}
                        />          
                    </Link>,
                id: <small>{product._id}</small>,
                name: product.name,
                price: `$${product.price}`, 
                stock: product.stock,
                actions: 
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`}>
                            <IconButton>
                                <EditOutlinedIcon />
                            </IconButton>
                        </Link> 
                        <IconButton 
                             onClick={() => {
                                setIsModalVisible(!isModalVisible)
                                setId(product._id)
                            }}
                        >
                            <DeleteOutlineIcon color="danger" />
                        </IconButton>  
                    </Fragment> 
            })
        })

        return data
    }   

    return (

        <Fragment>

            <MetaData title={'All Products'} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>

                        <Sidebar />

                    </aside>            

                    <article className="relative">

                        {loading ? <Loader /> : (

                            <Fragment>  

                                <div className="user-form cart">

                                    <h1>All Artwork</h1>                                
                                
                                    <MDBDataTableV5 
                                        data={setProducts()}   
                                        fullPagination   
                                        scrollX  
                                        scrollY   
                                        searchTop
                                        searchBottom={false}  
                                    />                                 

                                    <Link to="/dashboard">
                                        <Fab 
                                            size="small" 
                                            className="close" 
                                            color="primary"
                                            sx={{ position: 'absolute', top: 10, right: 10 }}
                                        >
                                            <CloseIcon />
                                        </Fab>
                                    </Link>

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
