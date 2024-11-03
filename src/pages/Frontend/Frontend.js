import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

// Components 
import Header from 'components/forentend/Header/Index'
import Footer from 'components/forentend/Footer/Index'

// Pages 
import Home from './Home'
import Contact from './Contact'
import About from './About'
import Messages from './Messages'
import { useAuthContext } from 'contexts/AuthContext'

export default function Frontend() {
  const {isAuth}=  useAuthContext()
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='messages' element={isAuth?<Messages/>:<Navigate to='/auth/login'/>} />
          <Route path='*' element={<>404 page not found!</>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
