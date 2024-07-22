import React from 'react';
import './css/post.css';

const Post = ({ imgURL, profilePic, username, description }) => {
  return (
    <div className='post-container'>
      <header>
        <img src={profilePic} alt='test profile' />
        <p>{username}</p>
      </header>
      <img src={imgURL} alt='test post' />
      <footer>
        <div className='post-description'>
          <h3>{username}</h3>
          <p>{description}</p>
        </div>
      </footer>
    </div>
  );
};

export default Post;
