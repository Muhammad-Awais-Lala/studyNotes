
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Badge, Card, Image } from 'antd'
import Meta from 'antd/es/card/Meta'
import ScreenLoader from 'components/ScreenLoader'
import { firestore } from 'config/firebase'
import { useAuthContext } from 'contexts/AuthContext'
import { useTodoContext } from 'contexts/TodoContext'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'

export default function Queris() {
  

  // const [messages, setMessages] = useState([])
  const { messages, setMessages } = useTodoContext()
  const [isProcessing, setIsProcessing] = useState(false)
  const initialState = { fullName: "", email: "", city: "", country: "", subject: "", message: "" }
  const [messageToUpdate, setMessageToUpdate] = useState({})


  
  return (
    <div className='container'>
    
      <h1 className='text-center mb-2'>Queries</h1>
      <div className="row">
        <div className="col">

          <div className="table-responsive">
            <table className="table">

              <thead>
                <tr>
                  <th scope="col">Sr.No</th>
                  <th scope="col">FullName</th>
                  <th scope="col">Image</th>
                  <th scope="col">Email</th>
                  <th scope="col">Country</th>
                  <th scope="col">City</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Queryes</th>
                </tr>
              </thead>

              <tbody>
                {messages.map((message, i) => {

                  return <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{message.fullName}</td>
                    {/* <td>{message.Image?.name}</td> */}
                    <td><div style={{width:40,height:40, overflow: 'hidden', borderRadius: '50%'}}><Image src={message.Image?.url}  alt={message.Image?.name} style={{  maxWidth:"100%", maxHeight: "100%", objectFit: "cover"}}   /></div></td>
                    <td>{message.email}</td>
                    <td>{message.country}</td>
                    <td>{message.city}</td>
                    <td>{message.subject}</td>
                    <td>{message.message.slice(0, 15)}</td>
                 
                  </tr>
                })
                }
              </tbody>

            </table>


          </div>

        </div>
      </div>
    



    </div>
  )
}

