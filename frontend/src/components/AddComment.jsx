import React from 'react';
import './css/add-comment.css';

const AddComment = () => {
  return (
    <div className='add-comment-container'>
      <form>
        <input type='text' placeholder='Add a comment...' />
        <button>Post</button>
      </form>
    </div>
  );
};

export default AddComment;
