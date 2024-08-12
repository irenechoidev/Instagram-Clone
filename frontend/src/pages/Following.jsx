import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import UserCard from '../components/UserCard';
import './css/following.css';

const Following = () => {
  return (
    <div className='following-container'>
      <aside>
        <Sidebar />
      </aside>

      <main>
        <nav>
          <div>
            <FontAwesomeIcon icon={faArrowLeft} className='back-button' />
          </div>
          <h3>Following</h3>
        </nav>

        <div className='following-cards-list'>
          <UserCard imgURL='/test.jpg' username='username' />
          <UserCard imgURL='/test.jpg' username='username' />
          <UserCard imgURL='/test.jpg' username='username' />
        </div>
      </main>
    </div>
  );
};
export default Following;
