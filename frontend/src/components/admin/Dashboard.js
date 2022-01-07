import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from '../admin/Sidebar'

const Dashboard = () => {

    const dispatch = useDispatch()
    const { users                        } = useSelector( state => state.allUsers  )
    const { products                     } = useSelector( state => state.products  )    
    const { loading, orders, totalAmount } = useSelector( state => state.allOrders )

    let outOfStock = 0
    products && products.forEach(product => {
        if(product.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch])

    return (

        <Fragment>

            <div className="container">

                <div className="wrapper parent">

                    <aside>

                        <Sidebar />

                    </aside>

                    <article>

                        <h1>Dashboard</h1>

                        {loading ? <Loader /> : (
                            
                            <Fragment>

                                <MetaData title={'Admin Dashboard'} />

                                <div className="admin admin-total">                                
                                   
                                    <p>
                                        Total Amount
                                        <br /> 
                                        <b>${totalAmount && totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} CAD</b>     
                                    </p>
                                            
                                </div>

                                <div className="parent">

                                    <Link to="/admin/products" className="admin admin-products">                                        
                                        <p>Artwork<br /> <b>{products && products.length}</b></p>                                        
                                        <p className="relative">
                                            <small>View Details</small>
                                            <i className="fa fa-chevron-right"/>
                                        </p>
                                    </Link>

                                    <Link to="/admin/orders" className="admin admin-orders">                                        
                                        <p>Orders<br /> <b>{orders && orders.length}</b></p>
                                        <p className="relative">
                                            <small>View Details</small>
                                            <i className="fa fa-chevron-right" />
                                        </p>                                            
                                    </Link>

                                    <Link to="/admin/users" className="admin admin-users">  
                                        <p>Users<br /> <b>{users && users.length}</b></p>                                        
                                        <p className="relative">
                                            <small>View Details</small>
                                            <i className="fa fa-chevron-right" />
                                        </p>   
                                    </Link>

                                    <div className="admin admin-stock">  
                                        <p>Out of Stock<br /><b>{outOfStock}</b></p>                                       
                                    </div>

                                </div>

                            </Fragment>

                        )}                    
                        
                    </article>
                    
                </div>

            </div>
            
        </Fragment>

    )

}

export default Dashboard
