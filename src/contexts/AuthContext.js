import { auth } from 'config/firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'

const AuthContext = createContext()

const initialState = { isAuth: false, user: {} }

const reducer = (state, { action, payload }) => {
    switch (action) {
        case "SET_LOGED_IN":
            return { ...state, isAuth: true, user: payload.user }
        case "SET_LOGED_OUT":
            return initialState
        default:
            return state
    }
}

export default function AuthContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)


const auth = getAuth();
useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid
          dispatch({ action: "SET_LOGED_IN", payload: { user } })
          console.log("this is testing,", uid)
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
},[auth])

const handleLogout = () => {
    dispatch({ action: "SET_LOGED_OUT" })
    signOut(auth)
      .then(() => {
        dispatch({ action: "SET_LOGED_OUT", payload: {  } })
        window.toastify("Logout Successfully", "success")
      })
      .catch(() => {
        window.toastify("Something went wrong while LogOut", "error")
      })
  }



    useEffect(() => {
        setTimeout(() => {
            setIsAppLoading(false)
        }, 1000)
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch, isAppLoading, setIsAppLoading , handleLogout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}