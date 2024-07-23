import React from 'react';
import Post from '../components/Post';

const Home = () => {
  return (
    <>
      <Post
        imgURL='test.jpg'
        profilePic='test.jpg'
        username='username'
        description='description description'
        createdAt={new Date()}
      />
    </>
  );
};

export default Home;
