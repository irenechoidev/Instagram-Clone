import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import UserCard from '../components/UserCard';
import './css/followers.css';

const Followers = () => {
  return (
    <div className='followers-container'>
      <aside>
        <Sidebar />
      </aside>

      <main>
        <nav>
          <div>
            <FontAwesomeIcon icon={faArrowLeft} className='back-button' />
          </div>
          <h3>Followers</h3>
        </nav>

        <div className='follower-cards-list'>
          <UserCard imgURL='/test.jpg' username='username' />
          <UserCard imgURL='/test.jpg' username='username' />
          <UserCard imgURL='/test.jpg' username='username' />
          <UserCard imgURL='/test.jpg' username='username' />
        </div>
      </main>
    </div>
  );
};
export default Followers;
