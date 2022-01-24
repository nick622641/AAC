import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from '../admin/Sidebar'
import FormattedPrice from '../layouts/FormattedPrice'

import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

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

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }))

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch])

    return (

        <Fragment>            

            {loading ? <Loader /> : (
                            
                <Fragment>

                    <MetaData title={'Admin Dashboard'} />

                    <div className="container">

                        <div className="wrapper parent dashboard">

                            <aside>

                                <Sidebar />

                            </aside>

                            <article>

                                <h1>Dashboard</h1>  

                                <Box sx={{ width: '100%' }}>

                                    <Grid container>
                                        <Grid item xs={12} sx={{ mb: 2 }}>
                                            <Item>
                                                <Card sx={{ background: 'var(--primary-color)' }}>
                                                    <CardContent>
                                                        <Typography gutterBottom color="white">
                                                            Total Amount
                                                        </Typography>
                                                        <Typography variant="h5" color="white">
                                                            {totalAmount && <FormattedPrice number={totalAmount} />} 
                                                        </Typography>                                                                        
                                                    </CardContent>                                                            
                                                </Card>                                                        
                                            </Item>
                                        </Grid>

                                        <Grid container columnSpacing={2}>

                                            <Grid item xs={12} md={3} sx={{ mb: 2 }}>

                                                <Item>

                                                    <Link to="/admin/products">   

                                                        <Card  sx={{ background: 'var(--cta-green)' }}>
                                                            <CardContent>
                                                                <Typography gutterBottom color="white">
                                                                    Artwork
                                                                </Typography>
                                                                <Typography variant="h5" color="white">
                                                                    {products && products.length}
                                                                </Typography>                                                                        
                                                            </CardContent>

                                                            <CardActions>
                                                                <Button 
                                                                    size="small" 
                                                                    sx={{ color: 'white', width: '100%' }}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                
                                                    </Link>
                                                </Item>
                                            </Grid>

                                            <Grid item xs={12} md={3} sx={{ mb: 2 }}>
                                                <Item>
                                                    <Link to="/admin/orders">  

                                                        <Card sx={{ background: '#ffbb00'}}>
                                                            <CardContent>
                                                                <Typography gutterBottom color="white">
                                                                    Orders
                                                                </Typography>
                                                                <Typography variant="h5" color="white">
                                                                    {orders && orders.length}
                                                                </Typography>                                                                        
                                                            </CardContent>

                                                            <CardActions>
                                                                <Button 
                                                                    size="small" 
                                                                    sx={{ color: 'white', width: '100%' }}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </CardActions>
                                                        </Card>                                     
                                                                                                
                                                    </Link>
                                                </Item>
                                            </Grid>

                                            <Grid item xs={12} md={3} sx={{ mb: 2 }}>
                                                <Item>
                                                    <Link to="/admin/users">  

                                                        <Card sx={{ background: '#0b97bb'}}>
                                                            <CardContent>
                                                                <Typography gutterBottom color="white">
                                                                    User
                                                                </Typography>
                                                                <Typography variant="h5" color="white">
                                                                    {users && users.length}
                                                                </Typography>                                                                        
                                                            </CardContent>

                                                            <CardActions>
                                                                <Button 
                                                                    size="small" 
                                                                    sx={{ color: 'white', width: '100%' }}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                        
                                                    </Link>
                                                </Item>
                                            </Grid>

                                            <Grid item xs={12} md={3}>
                                                <Item>
                                                    <Card sx={{ background: '#ea4845' }}>

                                                        <CardContent>
                                                            <Typography gutterBottom color="white">
                                                                Out of Stock
                                                            </Typography>
                                                            <Typography variant="h5" color="white">
                                                                {outOfStock}
                                                            </Typography>                                                                        
                                                        </CardContent>

                                                        <CardActions>
                                                            <Button size="small">&nbsp;</Button>
                                                        </CardActions>
                                                       
                                                    </Card>                                                   
                                                </Item>
                                            </Grid>

                                        </Grid>

                                    </Grid>

                                </Box>                                                              
                                
                            </article>
                            
                        </div>

                    </div>

                </Fragment>

            )}  
            
        </Fragment>

    )

}

export default Dashboard
