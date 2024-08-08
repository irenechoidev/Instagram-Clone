import React from 'react';
import './css/comment.css';

const Comment = ({ imgURL, username, createdDate }) => {
  return (
    <div className='comment-container'>
      <main>
        <header>
          <img src={imgURL} alt='test profile' />
          <p className='comment-username'>{username}</p>
        </header>

        <p>
          Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem
          Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem
          Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem
          Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem
          Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem
          Lorem Ipsem Lorem Ipsem Lorem
        </p>

        <footer>
          <p className='comment-create-date'>{createdDate.toDateString()}</p>
        </footer>
      </main>
    </div>
  );
};

export default Comment;
