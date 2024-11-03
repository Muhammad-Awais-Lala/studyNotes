import React, { useState } from 'react'
import { Input } from 'antd'
import { useAuthContext } from 'contexts/AuthContext'
import { auth } from 'config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register() {

    const initialState = { fullName: "", email: "", password: "", confirmPassword: "" }
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    //to store input fields values in state-->(initial state)
    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let { fullName, email, password, confirmPassword } = state

        fullName = fullName.trim()
        email = email.trim()
        password = password.trim()
        confirmPassword = confirmPassword.trim()

        if (fullName.length < 3) return window.toastify("Please Enter a valid name", "error")
        if (password.length < 6) return window.toastify("Password must longer then 6 digits", "error")
        if (confirmPassword !== password) return window.toastify("Please enter same password", "error")

        //Firebase Authentaction
        setIsProcessing(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                window.toastify("A new user has been created successfully", "success")
                console.log(user)

                // ...
            })
            .catch((err) => {
                window.toastify("Something went wrong while Registeration", "error")
                console.error(err)
                // ..
            })
            .finally(() => {
                setIsProcessing(false)
            }
            )

    }

    return (
        <div>
            <div className="contianer">
                <div className="row">
                    <div className="col-8 offset-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <div className="card p-5">
                            <h2 className='mb-1 text-center'>Register</h2>
                            <hr className='mx-5' />

                            <form onSubmit={handleSubmit}>
                                <input type="text" className='form-control mb-3' name='fullName' placeholder='Enter Full Name' onChange={handleChange} />
                                <input type="email" className='form-control mb-3' name='email' placeholder='Email' required onChange={handleChange} />
                                <Input.Password type='password' className='mb-3' name='password' placeholder='Password' required onChange={handleChange} />
                                <Input.Password type='password' name='confirmPassword' placeholder='Confirm Password' required onChange={handleChange} />

                                <button className='btn btn-primary w-100 mt-3' disabled={isProcessing}>
                                    {isProcessing ? <span className='spinner spinner-grow spinner-grow-sm'></span>
                                        : <span>Register</span>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



