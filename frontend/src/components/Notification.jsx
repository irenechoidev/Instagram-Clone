import React from 'react';
import './css/notification.css';

const Notification = () => {
  const isFollow = false;

  return (
    <div className='notification'>
      <main>
        <div className='notification-round-img'>
          <img src='/test.jpg' alt='test profile' />
        </div>

        <p>
          <span>Username </span> Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem
          Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem
        </p>

        {!isFollow && (
          <div className='notification-square-img'>
            <img src='/test.jpg' alt='test profile' />
          </div>
        )}

        {isFollow && (
          <div className='notification-button-group'>
            <button className='follow-button'>Follow</button>
          </div>
        )}
      </main>

      <footer>
        <p className='notification-create-date'>May 12</p>
      </footer>
    </div>
  );
};

export default Notification;
