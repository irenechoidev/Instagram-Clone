import React from 'react';
import './css/post.css';

const Post = () => {
  return (
    <div className='post-container'>
      <header>
        <img src='test.jpg' alt='test profile' />
        <p>username</p>
      </header>
      <img src='test.jpg' alt='test post' />
    </div>
  );
};

export default Post;
