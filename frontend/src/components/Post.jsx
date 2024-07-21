import React from 'react';
import './css/post.css';

const Post = ({ imgURL, profilePic, username }) => {
  return (
    <div className='post-container'>
      <header>
        <img src={profilePic} alt='test profile' />
        <p>{username}</p>
      </header>
      <img src={imgURL} alt='test post' />
    </div>
  );
};

export default Post;
