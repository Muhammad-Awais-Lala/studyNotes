import React, { useContext } from 'react'
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from 'contexts/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from 'config/firebase'
import { Image, Space } from 'antd'

export default function Navbar() {


  const { isAuth, dispatch , handleLogout } = useAuthContext()
  // const handleLogout = () => {
  //   dispatch({ action: "SET_LOGED_OUT" })
  //   signOut(auth)
  //     .then(() => {
  //       window.toastify("Logout Successfully", "success")
  //     })
  //     .catch(() => {
  //       window.toastify("Something went wrong while LogOut", "error")
  //     })
  // }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
          <div className="container">
            <Link to="/" className="navbar-brand" >Notely</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link" aria-current="page" activeStyle={{fontWeight:'bold'}}>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/messages" className="nav-link" activeStyle={{fontWeight:'bold'}}>Messages</NavLink>
                </li>

                {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Hooks
                  </a>
                  <ul className="dropdown-menu">
                    <li><NavLink to="hooks/useReducer" className="dropdown-item" activeStyle={{fontWeight:'bold'}}>Use Reducer</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li> */}

                <li className="nav-item">
                  <NavLink to="/contact" className="nav-link"activeStyle={{fontWeight:'bold'}} >Contact Us</NavLink >
                </li>
                <li className="nav-item">
                  <NavLink to="/dashboard" className="nav-link"activeStyle={{fontWeight:'bold'}} >Dashboard</NavLink >
                </li>
              </ul>

              <Space>
                <div className="d-flex">
                  <Image src="https://firebasestorage.googleapis.com/v0/b/todo-demo-practice.appspot.com/o/images%2Fvn3sa7uon1o-myimg.jpeg?alt=media&token=f948dfff-bbbb-4ce2-af3a-8565f0c23058" alt="" className=' rounded-circle' style={{ maxHeight: 40 }} />
                </div>
                <div className="d-flex">
                  {
                    !isAuth ? <Link to="/auth/login" className='btn btn-success' >Login</Link>
                      : <span><div className='btn btn-danger' onClick={handleLogout}>LogOut</div>  </span>
                  }
                </div>
              </Space>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
