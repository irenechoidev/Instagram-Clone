import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { getLikesText } from '../utils/formatText';
import './css/details-post.css';

const DetailsPost = ({
  imgURL,
  profilePic,
  username,
  description,
  createdDate,
}) => {
  const mockLikesCount = 0;
  const likesText = getLikesText(mockLikesCount);

  return (
    <div className='details-post-container'>
      <header>
        <img src={profilePic} alt='test profile' />
        <p>{username}</p>
      </header>

      <main>
        <img src={imgURL} alt='test post' />
      </main>

      <footer>
        <div className='details-post-buttons-container'>
          <div className='details-post-like-button'>
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className='details-post-comment-button'>
            <FontAwesomeIcon icon={faComment} />
          </div>
        </div>

        {likesText && <div className='details-post-likes'>{likesText}</div>}

        <div className='details-post-description'>
          <h3>{username}</h3>
          <p>{description}</p>
        </div>

        <div className='details-post-create-date'>
          {createdDate.toDateString()}
        </div>
      </footer>
    </div>
  );
};

export default DetailsPost;
