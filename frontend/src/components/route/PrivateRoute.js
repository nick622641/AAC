import React, { Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute({ children, isAdmin }) { 

  const { isAuthenticated, loading, user } = useSelector( state => state.auth )

  return (

    <Fragment>                 

        { loading === false && !isAdmin && (

            isAuthenticated ? children : <Navigate to="/login" />   
            
        )}         

        { loading === false && isAdmin === true && (           

            isAuthenticated && user.role === 'admin' ? children : <Navigate to="/login" />   

        )}          

    </Fragment>

  )

}

export default PrivateRoute

