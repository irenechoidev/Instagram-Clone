import React from 'react';
import './css/post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { getCommentsText, getLikesText } from '../utils/formatText';

const Post = ({ imgURL, profilePic, username, description, createdAt }) => {
  const mockLikesCount = 0;
  const mockCommentCount = 10;

  const likesText = getLikesText(mockLikesCount);
  const commentsText = getCommentsText(mockCommentCount);

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
        <div className='post-buttons-container'>
          <div className='post-like-button'>
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className='post-comment-button'>
            <FontAwesomeIcon icon={faComment} />
          </div>
        </div>

        {likesText && <div className='post-likes'>{likesText}</div>}

        <div className='post-description'>
          <h3>{username}</h3>
          <p>{description}</p>
        </div>

        <div className='post-comment'>{commentsText}</div>

        <div className='post-create-date'>{createdAt.toDateString()}</div>
      </footer>
    </div>
  );
};

export default Post;
