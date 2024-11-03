import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Resetpassword from './Resetpassword'
import ForgotPassword from './ForgotPassword'

export default function index() {
  return (
<Routes>
    <Route path='login' element={<Login/>}/>
    <Route path='register' element={<Register/>}/>
    <Route path='resetpassword' element={<Resetpassword/>}/>
    <Route path='forgotPassword' element={<ForgotPassword/>}/>
    <Route path='*' element={<>404 page not found!</>}/>
</Routes>
)
}
