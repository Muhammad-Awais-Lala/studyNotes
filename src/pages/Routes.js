import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend/Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import PrivateRoute from './PrivateRoute'
import { useAuthContext } from 'contexts/AuthContext'

export default function Index() {
  const { isAuth } = useAuthContext()
  const role = "buyer"
 
  return (
    <>

      <Routes>

        <Route path='/*' element={<Frontend />} />
        <Route path='/auth/*' element={!isAuth ? ( <Auth /> ) : role === "admin" ? (<Navigate to="/dashboard" /> ) : role === "buyer" ? ( <Navigate to="/contact" />) : null} />
        <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard} />} />
      </Routes>
    </>
  )
}
