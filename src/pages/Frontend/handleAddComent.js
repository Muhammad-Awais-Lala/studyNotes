import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from 'config/firebase'; // Adjust the path according to your structure

const AddCommentModal = ({ visible, onClose, note, user }) => {
  const [comment, setComment] = useState('');

  const handleAddComment = async () => {
    if (!comment.trim()) {
      message.error('Comment cannot be empty!');
      return;
    }

    try {
      const noteRef = doc(firestore, 'notes', note.id);
      await updateDoc(noteRef, {
        comments: arrayUnion({ text: comment, userId: user.uid, timestamp: new Date() }),
      });
      message.success('Comment added successfully!');
      setComment(''); // Reset comment input
      onClose(); // Close modal
    } catch (e) {
      console.error('Error adding comment: ', e);
      message.error('Something went wrong while adding the comment');
    }
  };

  return (
    <Modal
      title="Add Comment"
      visible={visible}
      onOk={handleAddComment}
      onCancel={onClose}
      okText="Submit"
      cancelText="Cancel"
    >
      <Input.TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here..."
      />
    </Modal>
  );
};

export default AddCommentModal;
