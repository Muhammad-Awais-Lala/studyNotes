import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardHome from './DashboardHome'
import Header from 'components/forentend/Header/Index'
import Footer from 'components/forentend/Footer/Footer'
import Sidebar from 'components/dashboard/Sidebar'
import MyNotes from './MyNotes'
import Queris from './Queris'
export default function index() {
  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<Sidebar Page={DashboardHome}/>} />
          <Route path='myNotes' element={<Sidebar Page={MyNotes}/>} />
          <Route path='queries' element={<Sidebar Page={Queris}/>} />
          <Route path='*' element={<>404 page not found!</>} />
        </Routes>
      </main>
    </>
  )
}
