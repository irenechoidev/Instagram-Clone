import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faMagnifyingGlass,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import './css/sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <section>
        <FontAwesomeIcon icon={faHouse} />
        <p>Home</p>
      </section>

      <section>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <p>Search</p>
      </section>

      <section>
        <FontAwesomeIcon icon={faSquarePlus} />
        <p>Create</p>
      </section>

      <section>
        <FontAwesomeIcon icon={faHeart} />
        <p>Notifications</p>
      </section>

      <section>
        <img src='test.jpg' alt='test profile' />
        <p>Profile</p>
      </section>

      <section>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        <p>Logout</p>
      </section>
    </div>
  );
};

export default Sidebar;
