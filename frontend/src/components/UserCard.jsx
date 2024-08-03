import React from 'react';
import './css/user-card.css';

const UserCard = ({ imgURL, username }) => {
  return (
    <div className='user-card'>
      <main>
        <img src={imgURL} alt='test profile' />
        <p>{username}</p>

        <div className='user-card-button-group'>
          <button className='follow-button'>Follow</button>
        </div>
      </main>
    </div>
  );
};

export default UserCard;
