import React from 'react';
import Sidebar from '../components/Sidebar';
import Notification from '../components/Notification';
import './css/notifications-page.css';

const NotificationsPage = () => {
  return (
    <div className='notifications-container'>
      <Sidebar />
      <main className='notifications-list'>
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </main>
    </div>
  );
};

export default NotificationsPage;
