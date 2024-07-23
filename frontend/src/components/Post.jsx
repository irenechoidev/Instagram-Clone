import React from 'react';
import './css/post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';

const Post = ({ imgURL, profilePic, username, description, createdAt }) => {
  const mockLikesCount = 30;
  const mockCommentCount = 10;

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
        <div className='post-likes'>{mockLikesCount} likes</div>

        <div className='post-description'>
          <h3>{username}</h3>
          <p>{description}</p>
        </div>

        <div className='post-comment'>
          {!mockCommentCount && <p>Add a comment...</p>}
          {mockCommentCount === 1 && <p>View {mockCommentCount} comment</p>}
          {mockCommentCount > 1 && <p>View all {mockCommentCount} comments</p>}
        </div>

        <div className='post-create-date'>{createdAt.toDateString()}</div>
      </footer>
    </div>
  );
};

export default Post;
