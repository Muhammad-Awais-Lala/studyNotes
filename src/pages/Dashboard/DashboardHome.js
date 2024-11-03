import React, { useEffect, useState } from 'react'
import { auth, firestore } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom'
import { useAuthContext } from 'contexts/AuthContext';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNotesContext } from 'contexts/NotesContext';

export default function DashboardHome() {

  const { user } = useAuthContext()
  const currentUser = user
  const initialState = { title: "", description: "", subject: "" }
  const [note, setNote] = useState(initialState)
  const { notes, setNotes } = useNotesContext()

  const handleChange = (e) => {
    setNote(s => ({ ...s, [e.target.name]: e.target.value }))
    // console.log(todo)
    console.log(user.email)
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    let { title, subject, description } = note

    title = title.trim()
    subject = subject.trim()
    description = description.trim()


    if (!title) return window.toastify("please enter title of task", "error")
    if (description.length < 10) return window.toastify("please enter detiled description", 'error')

    let todoData = {
      id: window.getRandomId(),
      title,
      description,
      subject,
      createdBy: user.uid,
      lastEditedBy: "",
      lastEditedAt: "",
      createddAt: "",
      collaborators: ""
    }

    try {
      setDoc(doc(firestore, "notes", todoData.id), todoData);
      window.toastify("A new Todo has been added successfully", 'success')

      setNotes((prevNotes) => [...prevNotes, todoData]);

      setNote(initialState)
    } catch (error) {
      console.error(error)
      window.toastify("A new Todo has been added successfully", 'success')

    }

  }
  return (

    <div className="container">
      <div className="row">
        <div className="col-6">
          <h2>Email:</h2><strong>{currentUser.email}</strong>
        </div>

      </div>

      {/* Form to add TODO */}
      <div className="row mt-5">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title"><b>*Title</b></label>
            <input type="text" className='form-control mb-2' id='title' name='title' value={note.title} onChange={handleChange} />


            <label htmlFor="subject"><b>Subject:</b></label>
            <input type="text" className='form-control mb-4' id='subject' name='subject' value={note.subject} onChange={handleChange} />

            <label htmlFor="descprition"><b>Desceprition:</b></label>
            <input type="text" className='form-control mb-4' id='desceprition' name='description' value={note.description} onChange={handleChange} />

            <input type='submit' className='btn btn-primary w-100' onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </div>

  )
}
