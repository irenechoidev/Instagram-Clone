import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { getCommentsText, getLikesText } from '../utils/formatText';
import './css/home-post.css';

const Post = ({ imgURL, profilePic, username, description, createdDate }) => {
  const mockLikesCount = 0;
  const mockCommentCount = 10;

  const likesText = getLikesText(mockLikesCount);
  const commentsText = getCommentsText(mockCommentCount);

  return (
    <div className='home-post-container'>
      <header>
        <img src={profilePic} alt='test profile' />
        <p>{username}</p>
      </header>

      <main>
        <img src={imgURL} alt='test post' />
      </main>

      <footer>
        <div className='home-post-buttons-container'>
          <div className='home-post-like-button'>
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className='home-post-comment-button'>
            <FontAwesomeIcon icon={faComment} />
          </div>
        </div>

        {likesText && <div className='home-post-likes'>{likesText}</div>}

        <div className='home-post-description'>
          <h3>{username}</h3>
          <p>{description}</p>
        </div>

        <div className='home-post-comment'>{commentsText}</div>

        <div className='home-post-create-date'>
          {createdDate.toDateString()}
        </div>
      </footer>
    </div>
  );
};

export default Post;
