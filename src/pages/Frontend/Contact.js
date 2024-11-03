import { firestore, storage } from 'config/firebase'
import { useTodoContext } from 'contexts/TodoContext'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'

export default function Contact() {


  const [isProcessing, setIsProcessing] = useState(false)
  const initialState = { fullName: "", email: "", city: "", country: "", subject: "", message: "" }
  const [state, setState] = useState(initialState)
  const [file, setFile] = useState({})
  const [isFileUploading, setIsFileUploading] = useState(false)
  const [progress, setProgress] = useState("")
  const { messages, setMessages } = useTodoContext()

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  //on Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    let { fullName, email, city, country, subject, message } = state

    fullName = fullName.trim()
    city = city.trim()
    country = country.trim()

    if (fullName.length < 3) return window.toastify("Please Enter a valid name", "error")
    if (!window.IsEmail(email)) return window.toastify("Please Enter valid email", "error") //IsEmail is a function defined in Global.js 
    if (message.length < 10) return window.toastify("Please Enter valid email", "error")

    let formData = {
      fullName,
      email,
      city,
      country,
      subject,
      message,
      id: window.getRandomId(),
      dateCreated: serverTimestamp()
    }

    setIsProcessing(true)
    if (file.name) {
      uploadFile(formData)
    }
    else {
      createDocument(formData)
    }
    setIsProcessing(false)
  }


  const uploadFile = (formData) => {
    let fileName = formData.id + "-" + file.name;
    // console.log(file)

    const storageRef = ref(storage, `images/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    setIsFileUploading(true)

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress)
      },
      (error) => {
        window.toastify("something went wrong while uploading image", "error")
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setIsFileUploading(false)
          const data = { ...formData, Image: { name: file.name, url: downloadURL } }
          // messages document is created in this function 
          createDocument(data)
        });
      }
    );
  }


  const createDocument = (formData) => { //(data) data which comes from uploading image

    try {
      //we can do same thing using: addDoc(collection( , ))   but it generatete random id himself
      setDoc(doc(firestore, "messages", formData.id), formData);

      // setMessages locallely
      setMessages((prevMessages) => [...prevMessages, formData]);

      window.toastify("Your Message has been sent successfully", "success")
      setState(initialState)

    } catch (e) {

      console.error("Error adding document: ", e);
      window.toastify("Something went wrong while sending message", "error")

    }

  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col col-md-8 offset-md-2 mt-5">
            <div className="card p-5">
              <h2 className='text-center'>Contact Form</h2>
              <hr className='my-2' />

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col col-md-6 mb-3">
                    <input type="text" className='form-control' placeholder='Full Name' name='fullName' value={state.fullName} onChange={handleChange} />
                  </div>
                  <div className="col col-md-6">
                    <input type='email' className='form-control' placeholder='Email' name='email' value={state.email} onChange={handleChange} />
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6 mb-3">
                    <input type="text" className='form-control' placeholder='City' name='city' value={state.city} onChange={handleChange} />
                  </div>
                  <div className="col col-md-6">
                    <input type='text' className='form-control' placeholder='Country' name='country' value={state.country} onChange={handleChange} />
                  </div>
                </div>

                <div className="row">
                  <div className="col col-md-6 mb-3">
                    <input type='text' className='form-control' placeholder='Subject of Message' name='subject' value={state.subject} onChange={handleChange} />
                  </div>
                  <div className="col col-md-6 mb-3">
                    {!isFileUploading ? <input type='file' className='form-control' onChange={(e) => setFile(e.target.files[0])} />
                      : <div className="progress mt-md-2" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar" style={{ width: progress + "%" }}> {progress} % </div>
                      </div>
                    }
                  </div>
                </div>

                <div className="row">
                  <div className="col mb-3">
                    <textarea className='form-control' placeholder='Message / Quiery' name="message" value={state.message} required onChange={handleChange}></textarea>
                  </div>
                </div>


                <button className='btn btn-primary w-100'>
                  {isProcessing ? <span className='spinner spinner-grow spinner-grow-sm'></span>
                    : <span>Send Message</span>}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}











