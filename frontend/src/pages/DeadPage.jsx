import React from 'react';
import './css/deadpage.css';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const DeadPage = () => {
  const navigate = useNavigate();
  return (
    <div className='dead-page-container'>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <h1>Sorry, this page isn't available.</h1>
        <p onClick={() => navigate('/')}>Go back to Instagram</p>
      </main>
    </div>
  );
};
export default DeadPage;
