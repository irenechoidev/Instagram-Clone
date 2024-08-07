import React from 'react';
import Sidebar from '../components/Sidebar';
import DetailsPost from '../components/DetailsPost';
import UserCard from '../components/UserCard';
import AddComment from '../components/AddComment';
import './css/post-details.css';

const Details = () => {
  return (
    <div className='post-details-container'>
      <Sidebar />
      <main className='post-details'>
        <DetailsPost
          key={'fake-id'}
          imgURL={'/test.jpg'}
          profilePic={'/test.jpg'}
          username={'username'}
          description={'description'}
          createdDate={new Date()}
        />

        <UserCard imgURL={'/test.jpg'} username={'username'} />
        <UserCard imgURL={'/test.jpg'} username={'username'} />
        <UserCard imgURL={'/test.jpg'} username={'username'} />
        <UserCard imgURL={'/test.jpg'} username={'username'} />
        <UserCard imgURL={'/test.jpg'} username={'username'} />

        <AddComment />
      </main>
    </div>
  );
};

export default Details;
