import { Input } from 'antd'
import { auth } from 'config/firebase'
import { useAuthContext } from 'contexts/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

  const { dispatch } = useAuthContext()
  const [isProcessing, setIsProcessing] = useState(false)
  const initialState = { email: "", password: "" }
  const [state, setState] = useState(initialState)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = state

    //Firebase Authentaction
    setIsProcessing(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        window.toastify("Login successfully", "success")
        console.log(user)
        // dispatch({ action: "SET_LOGED_IN", payload: { user } })
        navigate('/dashboard')

        // ...
      })
      .catch((err) => {
        window.toastify("Something went wrong while Login", "error")
        console.error(err)
        // ..
      })
      .finally(() => {
        setIsProcessing(false)
      }
      )

  }
  return (
    <div >
      <div className=" container">
        <div className="row">
          <div className="col-8 offset-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 ">
            <div className="card p-5">
              <h2>Login</h2>
              <p className='mb-5'>To Get Started with TODO Wallet</p>

              <form onSubmit={handleSubmit}>
                <input type="email" className='form-control mb-3' name='email' placeholder='Email' onChange={handleChange} />
                <Input.Password type='password' name='password' placeholder='Password' onChange={handleChange} />
                <Link to='/auth/register'>Not a User?</Link>
                <button className='btn btn-primary w-100'>
                  {isProcessing ? <span className='spinner spinner-grow spinner-grow-sm'></span>
                    : <span>Login</span>}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}






//////////////////////////////////////////////////////    Login By using Local Storage      ///////////////////
// import React, { useState } from 'react'
// import { Input, message } from 'antd'
// import { useAuthContext } from 'contexts/AuthContext'
// import { Link, useNavigate } from 'react-router-dom'

// const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/

// export default function Login() {

//   const [state, setState] = useState({ email: "", password: "" })
//   const {dispatch} = useAuthContext()
//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setState(s => ({ ...s, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const { email, password } = state

//     if (!regex.test(email)) { return message.error("Please enter a valid email") }

//     let users = JSON.parse(localStorage.getItem("users")) ||[]

//     const user = users.find(user => user.email === email)

//     if(user){
//       if(user.password===password){
//         dispatch({action: "SET_LOGED_IN",payload:{user}})
//         message.success("Login Successfully")
//         // navigate("/dashboard")
//       }
//       else{
//         message.error("Wrong Password")
//       }
//     }
//     else{
//       message.error("You are not Registerd Please Register First")
//     }
//   }

//   return (
//     <>
// <div className=" container">
//   <div className="row">
//     <div className="col-8 offset-2  col-md-6 offset-md-3 ">
//       <div className="card p-5">
//         <h2>Login</h2>
//         <p className='mb-5'>To Get Started with TODO Wallet</p>

//         <form onSubmit={handleSubmit}>
//           <input type="email" className='form-control mb-3' name='email' placeholder='Email' onChange={handleChange} />
//           <Input.Password type='password' name='password' placeholder='Password' onChange={handleChange} />
//           <Link to='/auth/register'>Not a User?</Link>
//           <input type="submit" className='btn btn-primary w-100 mb-3' />
//         </form>

//       </div>
//     </div>
//   </div>
// </div>
//     </>
//   )
// }







