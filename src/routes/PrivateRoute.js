import React from 'react'
import { Navigate } from 'react-router'


const PrivateRoute = ({user, children}) => {
  return (
    user ? children : <Navigate to="/login" />
  )
}

export default PrivateRoute