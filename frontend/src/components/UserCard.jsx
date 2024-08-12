import React from 'react';
import './css/user-card.css';

const following = false;

const UserCard = ({ imgURL, username }) => {
  return (
    <div className='user-card'>
      <main>
        <img src={imgURL} alt='test profile' />
        <p>{username}</p>

        <div className='user-card-button-group'>
          {following ? (
            <button className='following-button'>Following</button>
          ) : (
            <button className='follow-button'>Follow Back</button>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserCard;
