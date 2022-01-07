import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'

const ProductsList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, products } = useSelector(state => state.products)
    const { error: deleteError, isDeleted } = useSelector(state => state.product)

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
            alert.success('Artwork deleted successfully')    
            // navigate('/admin/products')        
            dispatch({ type: DELETE_PRODUCT_RESET })            
        }
    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'Preview',
                    field: 'url',
                },
                {
                    label: 'Artwork ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'                  
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
                price: `$${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, 
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`}>
                        <i className="fa fa-pencil"/>
                    </Link> 
                    &nbsp; &nbsp;                    
                    <i 
                        className="fa fa-trash-o"
                        onClick={() => deleteProductHandler(product._id)}
                    />
                </Fragment> 
            })
        })
        return data
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
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

                            <div className="user-form cart mdb-table">

                                <h1>All Artwork</h1>

                                {loading ? <Loader /> : (
                                    <MDBDataTable                                    
                                        data={setProducts()}
                                        bordered
                                        striped
                                        hover    
                                    />
                                )}

                            <Link to="/dashboard"><i className="fa fa-times"></i></Link>

                            </div>

                        </Fragment>

                    </article>

                </div>

            </div>
            
        </Fragment>
    )
}

export default ProductsList
