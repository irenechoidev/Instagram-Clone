import React from 'react';
import './css/post.css';

const Post = ({ imgURL, profilePic, username, description }) => {
  return (
    <div className='post-container'>
      <header>
        <img src={profilePic} alt='test profile' />
        <p>{username}</p>
      </header>

      <main>
        <img src={imgURL} alt='test post' />
      </main>

      <footer>
        <div className='post-description'>
          <h3>{username}</h3>
          <p>{description}</p>
        </div>
        <div className='post-createdDate'>{new Date().toDateString()}</div>
      </footer>
    </div>
  );
};

export default Post;
