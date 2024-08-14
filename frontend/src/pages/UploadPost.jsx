import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './css/upload-post.css';

const UploadPost = () => {
  const [description, setDescription] = useState();
  const [file, setFile] = useState();

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('username', '');
    formData.append('description', description);

    if (file) {
      formData.append('image', file);
    }
  };

  return (
    <div className='upload-post-container'>
      <Sidebar />
      <main className='upload-post'>
        <form className='upload-post-form-container' onSubmit={handleSubmit}>
          <h3>Add a New Post</h3>

          <input
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
            accept='image/*'
          />

          <textarea
            placeholder='Description here...'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

          <button>Submit</button>
        </form>
      </main>
    </div>
  );
};

export default UploadPost;
