import React, { createContext, useContext, useCallback, useState, useEffect } from 'react'
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { firestore } from 'config/firebase'
import { useAuthContext } from './AuthContext'

const TodoContext =createContext()

export default function TodoContextProvider({children}) {


    const {isAuth} = useAuthContext()
    const [checking , setChecking] = useState(0)
  
    const [messages, setMessages] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)



    const refrest =  useCallback(async()=>{
        setChecking(checking + 1)
    
        setIsProcessing(true)
        const querySnapshot = await getDocs(collection(firestore, "messages"));
        let array = []
    
        querySnapshot.forEach((doc) => {
          let data = doc.data()
          array.push(data)
          // doc.data() is undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
        });
    
        setMessages(array)
        setIsProcessing(false)
    },messages)
    
    useEffect(()=>{
      refrest()
    },[isAuth])


  return (
    <TodoContext.Provider value={{messages,setMessages}}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => useContext(TodoContext)