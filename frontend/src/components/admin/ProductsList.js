import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTable } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import FormattedPrice from '../layouts/FormattedPrice'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from '../admin/Sidebar'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'

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
                    sort: 'disabled'
                },
                {
                    label: 'Artwork ID',
                    field: 'id',
                    sort: 'disabled'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'disabled'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled'                
                }
            ],
            rows: []
        }

        products && products.forEach( product => {
            data.rows.push({
                url: <Link to={`/artwork/${product._id}`}>
                        <div className="cart-image">
                            <img 
                                src={product.images[0].thumbUrl} 
                                alt={product.name} 
                                className="centered-image"
                            />
                        </div>
                    </Link>,
                id: <small>{product._id}</small>,
                name: product.name,
                price: <FormattedPrice number={product.price} />, 
                stock: product.stock,
                actions: 
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`}>
                            <i className="fa fa-pencil" />
                        </Link> 
                        &nbsp; &nbsp;                    
                        <i 
                            className="fa fa-trash-o"
                            onClick={() => {
                                setIsModalVisible(!isModalVisible)
                                setId(product._id)
                            }}
                        />
                    </Fragment> 
            })
        })

        return data
    }   

    return (

        <Fragment>

            <MetaData title={'All Products'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside>

                        <Sidebar />

                    </aside>            

                    <article>

                        <Fragment>  

                            <div className="user-form cart">

                                <h1>All Artwork</h1>

                                {loading ? <Loader /> : (
                                    <MDBDataTable  
                                        className="mdb-table"                                  
                                        data={setProducts()}                                
                                    />
                                )}

                                <Link to="/dashboard"><i className="fa fa-times" /></Link>

                            </div>

                        </Fragment>

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
