import React from 'react';
import './css/post.css';

const Post = ({ imgURL, profilePic, username, description, createdAt }) => {
  const mockLikesCount = 30;

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
        <div className='post-likes'>{mockLikesCount} likes</div>
        <div className='post-description'>
          <h3>{username}</h3>
          <p>{description}</p>
        </div>
        <div className='post-create-date'>{createdAt.toDateString()}</div>
      </footer>
    </div>
  );
};

export default Post;
