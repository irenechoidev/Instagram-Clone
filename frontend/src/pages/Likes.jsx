import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import UserCard from '../components/UserCard';
import './css/likes.css';

const Likes = () => {
  return (
    <div className='likes-container'>
      <aside>
        <Sidebar />
      </aside>

      <main>
        <nav>
          <div>
            <FontAwesomeIcon icon={faArrowLeft} className='back-button' />
          </div>
        </nav>

        <div className='user-cards-list'>
          <UserCard imgURL='/test.jpg' username='username' />
          <UserCard imgURL='/test.jpg' username='username' />
          <UserCard imgURL='/test.jpg' username='username' />
        </div>
      </main>
    </div>
  );
};

export default Likes;
