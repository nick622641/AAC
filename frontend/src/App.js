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

import ProductsList                      from './components/admin/products/ProductsList'
import NewProduct                        from './components/admin/products/NewProduct'
import UpdateProduct                     from './components/admin/products/UpdateProduct'
import ProductReviews                    from './components/admin/products/ProductReviews'

import OrdersList                        from './components/admin/orders/OrdersList'
import ProcessOrder                      from './components/admin/orders/ProcessOrder'

import UsersList                         from './components/admin/users/UsersList'
import UpdateUser                        from './components/admin/users/UpdateUser'

import ArtistList                        from './components/admin/artists/ArtistList'
import NewArtist                         from './components/admin/artists/NewArtist'
import UpdateArtist                      from './components/admin/artists/UpdateArtist'

import OrientationList                   from './components/admin/orientations/OrientationList'
import NewOrientation                    from './components/admin/orientations/NewOrientation'
import UpdateOrientation                 from './components/admin/orientations/UpdateOrientation'

import MediaList                         from './components/admin/media/MediaList'
import NewMedia                          from './components/admin/media/NewMedia'
import UpdateMedia                       from './components/admin/media/UpdateMedia'

import Blogs                             from './components/Blogs'
import BlogDetails                       from './components/blog/BlogDetails'
import NewBlog                           from './components/admin/blogs/NewBlog'
import BlogsList                         from './components/admin/blogs/BlogsList'
import UpdateBlog                        from './components/admin/blogs/UpdateBlog'
import BlogComments                      from './components/admin/blogs/BlogComments'
import ImageUploader                     from './components/ImageUploader'

import PageDetails                       from './components/page/PageDetails'
import PagesList                         from './components/admin/pages/PagesList'
import NewPage                           from './components/admin/pages/NewPage'
import UpdatePage                        from './components/admin/pages/UpdatePage'

import Painters                          from './components/Painters'
import PainterDetails                    from './components/painter/PainterDetails'
import PaintersList                      from './components/admin/painters/PaintersList'
import NewPainter                        from './components/admin/painters/NewPainter'
import UpdatePainter                     from './components/admin/painters/UpdatePainter'

import StaffMembers                      from './components/StaffMembers'
import StaffDetails                      from './components/staff/StaffDetails'
import StaffList                         from './components/admin/staff/StaffList'
import NewStaff                          from './components/admin/staff/NewStaff'
import UpdateStaff                       from './components/admin/staff/UpdateStaff'

import Friends                           from './components/Friends'
import FriendDetails                     from './components/friends/FriendDetails'
import FriendList                        from './components/admin/friends/FriendList'
import NewFriend                         from './components/admin/friends/NewFriend'
import UpdateFriend                      from './components/admin/friends/UpdateFriend'

import Courses                           from './components/Courses'
import CourseDetails                     from './components/course/CourseDetails'
import CourseList                        from './components/admin/courses/CourseList'
import NewCourse                         from './components/admin/courses/NewCourse'
import UpdateCourse                      from './components/admin/courses/UpdateCourse'

function App() {  

  const { loggingOut } = useSelector(state => state.auth)

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
  const redirect = loggingOut ? true : false

  const transitions = useTransition( location, {
    from:  { opacity: 0,   transform: "translate( 100%, 0%)" },
    enter: { opacity: 1,   transform: "translate(   0%, 0%)" },
    leave: { opacity: 0.5, transform: "translate(-100%, 0%)", position: "absolute", top: "90px", width: "100%" }
  })  

  return (    
    
    <Fragment>

      <Header />        

      {transitions((props, item) => (      
        <animated.main style={props}>

        {stripeApiKey && 
        <Elements stripe={location.pathname === '/payment' ? loadStripe(stripeApiKey) : null}>

          <ScrollToTop />
          
          <Routes location={redirect ? null : item}>

            <Route path="/"                      element={<Home                                                         />} />
            <Route path="/blogs"                 element={<Blogs                                                        />} />
            <Route path="/blog/:slug"            element={<BlogDetails                                                  />} />
            <Route path="/gallery"               element={<Gallery                                                      />} />
            <Route path="/gallery/:keyword"      element={<Gallery                                                      />} />
            <Route path="/gallery/artist/:artist" element={<Gallery                                                     />} />
            <Route path="/gallery/orientation/:orientation" element={<Gallery                                           />} />
            <Route path="/gallery/medium/:medium" element={<Gallery                                                     />} />
            <Route path="/gallery/rating/:rating" element={<Gallery                                                     />} />
            <Route path="/artwork/:slug"         element={<ProductDetails                                               />} />             
            <Route path="/artwork/new"           element={<PrivateRoute><ImageUploader                   /></PrivateRoute>} />             
            
            <Route path="/page/:slug"            element={<PageDetails                                                  />} />

            <Route path="/painters"              element={<Painters                                                     />} />
            <Route path="/painter/:slug"         element={<PainterDetails                                               />} />

            <Route path="/staff"                 element={<StaffMembers                                                 />} />
            <Route path="/staff/:slug"           element={<StaffDetails                                                 />} />
            <Route path="/friends"               element={<Friends                                                      />} />
            <Route path="/friend/:slug"          element={<FriendDetails                                                />} />
            <Route path="/courses"               element={<PrivateRoute><Courses/></PrivateRoute                         >} />
            <Route path="/course/:slug"          element={<PrivateRoute><CourseDetails/></PrivateRoute                   >} />

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
            
            <Route path="/admin/dashboard"       element={<PrivateRoute isAdmin={true}><Dashboard        /></PrivateRoute>} />
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

            <Route path="/admin/blog"            element={<PrivateRoute isAdmin={true}><NewBlog          /></PrivateRoute>} />
            <Route path="/admin/blogs"           element={<PrivateRoute isAdmin={true}><BlogsList        /></PrivateRoute>} /> 
            <Route path="/admin/blog/:id"        element={<PrivateRoute isAdmin={true}><UpdateBlog       /></PrivateRoute>} />
            <Route path="/admin/comments"        element={<PrivateRoute isAdmin={true}><BlogComments     /></PrivateRoute>} />                        
            
            <Route path="/admin/pages"           element={<PrivateRoute isAdmin={true}><PagesList        /></PrivateRoute>} /> 
            <Route path="/admin/page"            element={<PrivateRoute isAdmin={true}><NewPage          /></PrivateRoute>} />
            <Route path="/admin/page/:id"        element={<PrivateRoute isAdmin={true}><UpdatePage       /></PrivateRoute>} />

            <Route path="/admin/painter"         element={<PrivateRoute isAdmin={true}><NewPainter       /></PrivateRoute>} />
            <Route path="/admin/painters"        element={<PrivateRoute isAdmin={true}><PaintersList     /></PrivateRoute>} /> 
            <Route path="/admin/painter/:id"     element={<PrivateRoute isAdmin={true}><UpdatePainter    /></PrivateRoute>} />

            <Route path="/admin/staff/new"       element={<PrivateRoute isAdmin={true}><NewStaff         /></PrivateRoute>} />
            <Route path="/admin/staff"           element={<PrivateRoute isAdmin={true}><StaffList        /></PrivateRoute>} /> 
            <Route path="/admin/staff/:id"       element={<PrivateRoute isAdmin={true}><UpdateStaff      /></PrivateRoute>} />

            <Route path="/admin/friend/new"      element={<PrivateRoute isAdmin={true}><NewFriend        /></PrivateRoute>} />
            <Route path="/admin/friends"         element={<PrivateRoute isAdmin={true}><FriendList       /></PrivateRoute>} /> 
            <Route path="/admin/friend/:id"      element={<PrivateRoute isAdmin={true}><UpdateFriend     /></PrivateRoute>} />

            <Route path="/admin/course/new"      element={<PrivateRoute isAdmin={true}><NewCourse        /></PrivateRoute>} />
            <Route path="/admin/courses"         element={<PrivateRoute isAdmin={true}><CourseList       /></PrivateRoute>} /> 
            <Route path="/admin/course/:id"      element={<PrivateRoute isAdmin={true}><UpdateCourse     /></PrivateRoute>} />

          </Routes>   

        </Elements>
        }        

        </animated.main>       
      ))}   

      {!location.pathname.includes('admin') && (
        <Footer />
      )}  

    </Fragment>

  )
  
}

export default App
