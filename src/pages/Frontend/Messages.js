import { EditOutlined, MessageTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Card, Image, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import ScreenLoader from 'components/ScreenLoader';
import { firestore } from 'config/firebase';
import { useAuthContext } from 'contexts/AuthContext';
import { useNotesContext } from 'contexts/NotesContext';
import { useTodoContext } from 'contexts/TodoContext';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AddCommentModal from './handleAddComent'; // Import the new component

export default function Messages() {
  const navigate = useNavigate();
  const { isAuth, user } = useAuthContext();
  const { notes, setNotes } = useNotesContext();
  const { messages, setMessages } = useTodoContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const initialState = { title: '', subject: '', description: '' };
  const [noteToUpdate, setNoteToUpdate] = useState({});
  const [commentModalVisible, setCommentModalVisible] = useState(false); // State for modal visibility
  const [selectedNote, setSelectedNote] = useState(null); // State for the note to which the comment will be added

  const handleChange = (e) => {
    setNoteToUpdate((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  ////////////////////////////////////////////// Update Note //////////////////////////////////////
  

  const handleUpdate = () => {

    let { title, subject, description } = noteToUpdate

    setIsProcessing(true)
    try {

      // setDoc(doc(firestore, "messages", messageToUpdate.id), { fullName,email,city,country,subject,message },); 
      updateDoc(doc(firestore, "notes", noteToUpdate.id), { title, subject, description,lastEditedBy: user.uid },);
      setNotes((prevNotes) =>
        prevNotes.map((msg) =>
          msg.id === noteToUpdate.id ? { ...msg, title, subject, description,lastEditedBy: user.uid } : msg
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



  

  const addComment = (note) => {
    setSelectedNote(note);
    setCommentModalVisible(true); // Open comment modal
  };

  if (isProcessing) return <ScreenLoader />;
  return (
    <div className='container'>
      <h1 className='text-center mb-2'>All Notes</h1>
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
                  <th scope="col">Action</th>
                  <th scope="col">ADD Comment</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{note.title}</td>
                    <td>{note.subject}</td>
                    <td>{note.description.slice(0,25)}</td>
                    <td>
                      <div className="row">
                        <div className="col">
                          {isAuth ? (
                            <button
                              className='btn btn-sm btn-info'
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => setNoteToUpdate(note)}
                            >
                              Edit <EditOutlined />
                            </button>
                          ) : (
                            <div className="btn btn-sm btn-danger" onClick={() => navigate('/auth/login')}>
                              Login Required
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <button className='btn btn-sm' onClick={() => addComment(note)}>
                        <MessageTwoTone />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Include the AddCommentModal here */}
      <AddCommentModal
        visible={commentModalVisible}
        onClose={() => setCommentModalVisible(false)}
        note={selectedNote}
        user={user}
      />

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              <button type="button" className="btn btn-primary" onClick={() => handleUpdate()}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
