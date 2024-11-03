// import React, { useState } from 'react';

// let nameString = "my name is awais";

// export default function About() {
//   const [inputValue, setInputValue] = useState(nameString);

//   const handleChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleSubmit = () => {
//     alert("Submitted value: " + inputValue);
//   };

//   return (
//     <div>
//       <input  type="text" value={inputValue} onChange={handleChange} placeholder="Enter text here" />
//     </div>
//   );
// }








/////////////////////// image preview ///////////////////////////////////////////////////
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import React, { useState } from 'react';

const ImageUploadPreview = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview to the file URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{ width: '200px', height: 'auto', marginTop: '10px' }}
        />
      )}
      
    </div>
  );
};

export default ImageUploadPreview;










//////////////////////////////////////////////// Update in state ///////////////////////////////////

// setMessages((prevMessages) =>
//   prevMessages.map((msg) =>
//     msg.id === messageToUpdate.id ? { ...msg, fullName, email, city, country, subject, message } : msg
//   )
// );

//////////////////////////////////////////// Delete in state///////////////////////////////////////

// setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== message.id));


////////////////////////////////////////////// Add message //////////////////////////////////////////   
// setMessages((prevMessages) => [...prevMessages, formData]);


 // badge  /////
{/* <Badge count={messages.length}>
      <ShoppingCartOutlined style={{fontSize:24}}/>
      </Badge> */}