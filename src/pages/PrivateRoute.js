import { useAuthContext } from 'contexts/AuthContext'
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({Component}) {
    const {isAuth} = useAuthContext()
    const role = "buyer"

    if(!isAuth) return <Navigate to='/auth/login'/>
   console.log("Component",Component)
  

  return ( <Component/> )
}
