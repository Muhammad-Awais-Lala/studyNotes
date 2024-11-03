import { firestore } from 'config/firebase'
import { collection, getDocs } from 'firebase/firestore'
import React, { Children, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'

const NotsContext = createContext()

export default function NotsContextProvider({ children }) {

  const { isAuth } = useAuthContext()
  const [notes, setNotes] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)


  const refrest = useCallback(async () => {

    setIsProcessing(true)
    const querySnapshot = await getDocs(collection(firestore, "notes"));
    let array = []

    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
      // doc.data() is undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
    });

    setNotes(array)
    setIsProcessing(false)
  }, notes)

  useEffect(() => {
    refrest()
  }, [isAuth])


  return (
    <NotsContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotsContext.Provider>
  )
}

export const useNotesContext = () => useContext(NotsContext)