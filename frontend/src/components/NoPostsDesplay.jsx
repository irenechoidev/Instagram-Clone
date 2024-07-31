import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import './css/noPostsDisplay.css';

const NoPostsDisplay = () => {
  return (
    <div className='no-posts-display-container'>
      <FontAwesomeIcon icon={faCamera} className='camera-icon' />
      <p>No posts yet</p>
    </div>
  );
};
export default NoPostsDisplay;
