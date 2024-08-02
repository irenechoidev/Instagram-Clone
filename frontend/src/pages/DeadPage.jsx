import React from 'react';
import './css/deadpage.css';
import { useNavigate } from 'react-router-dom';

const DeadPage = () => {
  const navigate = useNavigate();
  return (
    <div className='dead-page-container'>
      <h1>Sorry, this page isn't available.</h1>
      <p onClick={() => navigate('/')}>Go back to Instagram</p>
    </div>
  );
};
export default DeadPage;
