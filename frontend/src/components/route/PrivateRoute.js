import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PrivateRoute({ children, isAdmin }) { 

  const navigate = useNavigate()
  const { isAuthenticated, loading, user } = useSelector( state => state.auth )

  useEffect(() => {

    if ( loading === false ) {

      if ( !isAuthenticated ) {
        navigate('/login')
      }   

      if ( user && isAdmin ) {
        if ( user.role !== 'admin' ) {
          navigate('/')
        }        
      }

    }    

  }, [navigate, loading, isAuthenticated, isAdmin, user])

  return (

    <Fragment>                 

      { loading === false && !isAdmin && (

        isAuthenticated === true && children
          
      )}  

      { loading === false && isAdmin === true && (           

        isAuthenticated === true && user.role === 'admin' && children 

      )}           

    </Fragment>

  )

}

export default PrivateRoute