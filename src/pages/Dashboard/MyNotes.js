import React from 'react'
import { DeleteOutlined, EditOutlined, RightCircleTwoTone, ShoppingCartOutlined } from '@ant-design/icons'

import ScreenLoader from 'components/ScreenLoader'
import { firestore } from 'config/firebase'
import { useAuthContext } from 'contexts/AuthContext'
import { useNotesContext } from 'contexts/NotesContext'
import { useTodoContext } from 'contexts/TodoContext'
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Space } from 'antd'

export default function MyNotes() {

    const [currentUser, setCurrentUser] = useState({})
    const navigate = useNavigate()

    const [noteToShow, setNoteToShow] = useState({})

    const { user } = useAuthContext()
    const { notes, setNotes } = useNotesContext()
    const { messages, setMessages } = useTodoContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const initialState = { title: "", subject: "", description: "" }
    const [noteToUpdate, setNoteToUpdate] = useState({})




    const handleChange = (e) => {
        setNoteToUpdate(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    ////////////////////////////////////////////// Update Note //////////////////////////////////////
    const handleUpdate = () => {

        let { title, subject, description } = noteToUpdate

        setIsProcessing(true)
        try {

            // setDoc(doc(firestore, "messages", messageToUpdate.id), { fullName,email,city,country,subject,message },); 
            updateDoc(doc(firestore, "notes", noteToUpdate.id), { title, subject, description, lastEditedBy: user.uid },);
            setNotes((prevNotes) =>
                prevNotes.map((msg) =>
                    msg.id === noteToUpdate.id ? { ...msg, title, subject, description, lastEditedBy: user.uid } : msg
                )
            );
            window.toastify("Your Message has been Edited Successfully", "success")
            setNoteToUpdate(initialState)

        } catch (e) {

            console.error("Error updating document: ", e);
            window.toastify("Something went wrong while Editing message", "error")

        }
        setIsProcessing(false)

    }
    ////////////////////////////////////////////////// Delete messages /////////////////////////////////
    const handleDelete = async (note) => {
        setIsProcessing(true)

        try {

            await deleteDoc(doc(firestore, "notes", note.id),);
            setNotes((prevNotes) => prevNotes.filter((nt) => nt.id !== note.id))
            window.toastify("Your Message has been deleted Successfully", "success")

        } catch (e) {

            console.error("Error deleting document: ", e);
            window.toastify("Something went wrong while Deleting message", "error")

        }
        setIsProcessing(false)
    }

    if (isProcessing) return <ScreenLoader />

    return (

        <div className='container'>


            <h1 className='text-center mb-2'>MY Notes</h1>
            <div className="row">
                <div className="col">

                    <div className="table-responsive">
                        <table className="table">

                            <thead>
                                <tr>
                                    <th scope="col">Count</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Last Edit BY</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Coments</th>
                                </tr>
                            </thead>

                            <tbody>
                                {notes
                                    .filter(note => note.createdBy === user.uid) // Only include notes from the current user
                                    .map((note, i) => (
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{note.title}</td>
                                            <td>{note.subject}</td>
                                            <td>{note.description.slice(0,25)}</td>
                                            <td>{note.lastEditedBy}</td>
                                            <td>
                                                <div className="row">
                                                    <div className="col">
                                                        <Space>

                                                            <button
                                                                className='btn btn-sm btn-info'
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                                onClick={() => setNoteToUpdate(note)}
                                                            >
                                                                Edit <EditOutlined />
                                                            </button>
                                                            <button className='btn btn-sm btn-danger' onClick={() => handleDelete(note)}>Del<DeleteOutlined /></button>
                                                        </Space>

                                                    </div>
                                                </div>
                                            </td>
                                            <td>

                                                <button
                                                    className='btn btn-sm '
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#note-modal"
                                                    onClick={() => setNoteToShow(note)}

                                                >
                                                    <RightCircleTwoTone />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>

                        </table>
                        <button
                            className='btn btn-primary'
                            data-bs-toggle="modal"
                            data-bs-target="#all-coments" >
                            View All Coments
                        </button>


                    </div>

                </div>
            </div>
            {/* ////////////////////////////////////////////////////////////////////////////// */}


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className='form-control mb-2' value={noteToUpdate.title} name='title' onChange={handleChange} />
                            <input type="text" className='form-control mb-2' value={noteToUpdate.description} name='description' onChange={handleChange} />
                            <input type="text" className='form-control mb-2' value={noteToUpdate.subject} name='subject' onChange={handleChange} />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleUpdate()} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>



            {/* //////////////////////////////////////////one coment model//////////////////////////////////  */}
            <div className="modal fade" id="note-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Title: </b>{noteToShow.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            {/* <h6 className="mb-2"><b>Subject: </b> {noteToShow.subject}</h6>
                                    <p className="mb-2"><b>Description: </b>{noteToShow.description}</p>
                                    <p className="mb-2"><b>Coments: </b>{noteToShow.description}</p> */}
                            <h2>{noteToShow.title}</h2>
                            <p>{noteToShow.description}</p>

                            <h3>Comments:</h3>
                            {noteToShow.comments && noteToShow.comments.length > 0 ? (
                                noteToShow.comments.map((comment, index) => (
                                    <div key={index}>
                                        <p>{comment.text}</p>
                                        <small>By User ID: {comment.userId}</small>
                                        <small> - {comment.timestamp}</small>
                                    </div>

                                ))
                            ) : (
                                <p>No comments yet</p>

                            )}


                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setNoteToShow({})}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* //////////////////////////////////////////one coment model//////////////////////////////////  */}
            <div className="modal fade" id="all-coments" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"><b>All Coments </b>{noteToShow.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            {notes.map((note, noteIndex) => (
                                <div key={note.id}>
                                    <h3>{note.title}</h3>
                                    <p>{note.description}</p>

                                    <h4>Comments:</h4>
                                    {note.comments && note.comments.length > 0 ? (
                                        note.comments.map((comment, commentIndex) => (
                                            <div key={commentIndex}>
                                                <p>{comment.text}</p>
                                                <small>By User ID: {comment.userId}</small>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet</p>
                                    )}
                                </div>
                            ))}



                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
