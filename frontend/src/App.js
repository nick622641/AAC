import { Fragment, useEffect, useState } from 'react'
import { useTransition, animated       } from 'react-spring'
import { Routes, Route, useLocation    } from 'react-router-dom'
import { loadUser                      } from './actions/userActions'
import { useSelector                   } from 'react-redux'
import store                             from './store'
// Payments
import { Elements                      } from '@stripe/react-stripe-js'
import { loadStripe                    } from '@stripe/stripe-js'
import axios                             from 'axios'
// Routes
import Header                            from './components/layouts/Header'
import Footer                            from './components/layouts/Footer'
import Home                              from './components/Home'
import Terms                             from './components/Terms'
import Privacy                           from './components/Privacy'

import Login                             from './components/user/Login'
import Register                          from './components/user/Register'
import Gallery                           from './components/Gallery'
import ProductDetails                    from './components/product/ProductDetails'
import PrivateRoute                      from './components/route/PrivateRoute'
import ScrollToTop                       from './components/route/ScrollToTop'
// User Imports
import Profile                           from './components/user/Profile'
import UpdateProfile                     from './components/user/UpdateProfile'
import UpdatePassword                    from './components/user/UpdatePassword'
import ForgotPassword                    from './components/user/ForgotPassword'
import NewPassword                       from './components/user/NewPassword'
// Cart Imports
import Cart                              from './components/cart/Cart'
import Shipping                          from './components/cart/Shipping'
import ConfirmOrder                      from './components/cart/ConfirmOrder'
import Payment                           from './components/cart/Payment'
import OrderSuccess                      from './components/cart/OrderSuccess'
// Order Imports
import ListOrders                        from './components/order/ListOrders'
import OrderDetails                      from './components/order/OrderDetails'
// Admin Imports
import Dashboard                         from './components/admin/Dashboard'
import ProductsList                      from './components/admin/ProductsList'
import NewProduct                        from './components/admin/NewProduct'
import UpdateProduct                     from './components/admin/UpdateProduct'
import OrdersList                        from './components/admin/OrdersList'
import ProcessOrder                      from './components/admin/ProcessOrder'
import UsersList                         from './components/admin/UsersList'
import UpdateUser                        from './components/admin/UpdateUser'
import ProductReviews                    from './components/admin/ProductReviews'
import ArtistList                        from './components/admin/ArtistList'
import NewArtist                         from './components/admin/NewArtist'
import UpdateArtist                      from './components/admin/UpdateArtist'
import OrientationList                   from './components/admin/OrientationList'
import NewOrientation                    from './components/admin/NewOrientation'
import UpdateOrientation                 from './components/admin/UpdateOrientation'
import MediaList                         from './components/admin/MediaList'
import NewMedia                          from './components/admin/NewMedia'
import UpdateMedia                       from './components/admin/UpdateMedia'

function App() {  

  const { product    } = useSelector( state => state.productDetails )  
  const { loggingOut } = useSelector( state => state.auth )

  const [ stripeApiKey, setStripeApiKey ] = useState('')    
  useEffect(() => {
    store.dispatch(loadUser())
    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripApiKey()
  }, [])

  const location = useLocation()
  const transitions = useTransition( location, {
    from:  { opacity: 0,   transform: "translate( 100%, 0%)" },
    enter: { opacity: 1,   transform: "translate(   0%, 0%)" },
    leave: { opacity: 0.5, transform: "translate(-100%, 0%)", position: "absolute", top: "94px", width: "100%" }
  })

  const redirect = !loggingOut &&
                    location.pathname !== `/artwork/${product._id}` &&                    
                    location.pathname !== '/shipping' && 
                    location.pathname !== '/login' 
                  ? false : true

  return (    
    
    <Fragment>

      <Header />        

      {transitions((props, item) => (      
        <animated.div style={props} className="main">

        {stripeApiKey && 
        <Elements stripe={location.pathname === '/payment' ? loadStripe(stripeApiKey) : null}>

          <ScrollToTop />
          
          <Routes location={redirect ? null : item} >

            <Route path="/"                      element={<Home                                                         />} />
            <Route path="/gallery"               element={<Gallery                                                      />} />
            <Route path="/gallery/:keyword"      element={<Gallery                                                      />} />
            <Route path="/gallery/artist/:artist" element={<Gallery                                                      />} />
            <Route path="/gallery/orientation/:orientation" element={<Gallery                                                      />} />
            <Route path="/gallery/medium/:medium" element={<Gallery                                                      />} />
            <Route path="/gallery/rating/:rating" element={<Gallery                                                      />} />
            <Route path="/artwork/:id"           element={<ProductDetails                                               />} />             
            <Route path="/terms"                 element={<Terms                                                        />} />
            <Route path="/privacy"               element={<Privacy                                                      />} />

            <Route path="/login"                 element={<Login                                                        />} />
            <Route path="/register"              element={<Register                                                     />} />  
            <Route path="/password/forgot"       element={<ForgotPassword                                               />} />
            <Route path="/password/reset/:token" element={<NewPassword                                                  />} /> 
            <Route path="/me"                    element={<PrivateRoute><Profile                         /></PrivateRoute>} />           
            <Route path="/me/update"             element={<PrivateRoute><UpdateProfile                   /></PrivateRoute>} />
            <Route path="/password/update"       element={<PrivateRoute><UpdatePassword                  /></PrivateRoute>} />

            <Route path="/cart"                  element={<Cart                                                         />} />
            <Route path="/orders/me"             element={<PrivateRoute><ListOrders                      /></PrivateRoute>} />
            <Route path="/order/:id"             element={<PrivateRoute><OrderDetails                    /></PrivateRoute>} />
            <Route path="/shipping"              element={<PrivateRoute><Shipping                        /></PrivateRoute>} />
            <Route path="/order/confirm"         element={<PrivateRoute><ConfirmOrder                    /></PrivateRoute>} />                                
            <Route path="/payment"               element={<PrivateRoute><Payment                         /></PrivateRoute>} />            
            <Route path="/success"               element={<PrivateRoute><OrderSuccess                    /></PrivateRoute>} />
            
            <Route path="/dashboard"             element={<PrivateRoute isAdmin={true}><Dashboard        /></PrivateRoute>} />
            <Route path="/admin/products"        element={<PrivateRoute isAdmin={true}><ProductsList     /></PrivateRoute>} />                
            <Route path="/admin/product"         element={<PrivateRoute isAdmin={true}><NewProduct       /></PrivateRoute>} />
            <Route path="/admin/product/:id"     element={<PrivateRoute isAdmin={true}><UpdateProduct    /></PrivateRoute>} />
            <Route path="/admin/orders"          element={<PrivateRoute isAdmin={true}><OrdersList       /></PrivateRoute>} />
            <Route path="/admin/order/:id"       element={<PrivateRoute isAdmin={true}><ProcessOrder     /></PrivateRoute>} />
            <Route path="/admin/users"           element={<PrivateRoute isAdmin={true}><UsersList        /></PrivateRoute>} />
            <Route path="/admin/user/:id"        element={<PrivateRoute isAdmin={true}><UpdateUser       /></PrivateRoute>} />
            <Route path="/admin/reviews"         element={<PrivateRoute isAdmin={true}><ProductReviews   /></PrivateRoute>} />
            <Route path="/admin/artists"         element={<PrivateRoute isAdmin={true}><ArtistList       /></PrivateRoute>} />
            <Route path="/admin/artist"          element={<PrivateRoute isAdmin={true}><NewArtist        /></PrivateRoute>} />
            <Route path="/admin/artist/:id"      element={<PrivateRoute isAdmin={true}><UpdateArtist     /></PrivateRoute>} />
            <Route path="/admin/orientations"    element={<PrivateRoute isAdmin={true}><OrientationList  /></PrivateRoute>} />
            <Route path="/admin/orientation"     element={<PrivateRoute isAdmin={true}><NewOrientation   /></PrivateRoute>} />
            <Route path="/admin/orientation/:id" element={<PrivateRoute isAdmin={true}><UpdateOrientation/></PrivateRoute>} />
            <Route path="/admin/media"           element={<PrivateRoute isAdmin={true}><MediaList        /></PrivateRoute>} />
            <Route path="/admin/medium"          element={<PrivateRoute isAdmin={true}><NewMedia         /></PrivateRoute>} />
            <Route path="/admin/media/:id"       element={<PrivateRoute isAdmin={true}><UpdateMedia      /></PrivateRoute>} />

          </Routes>   

        </Elements>
        }        

        </animated.div>       
      ))}         

      <Footer />

    </Fragment>

  )
  
}

export default App
