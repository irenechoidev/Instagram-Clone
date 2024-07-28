import React from 'react';
import Post from '../components/Post';
import './css/home.css';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const post = {
    imgURL: 'test.jpg',
    profilePic: 'test.jpg',
    username: 'username',
    description: 'description description',
    createdAt: new Date(),
  };

  const listOfPosts = [post, post, post, post];

  return (
    <div className='home-container'>
      <Sidebar />

      <main className='posts-list'>
        {listOfPosts.map((p) => (
          <Post
            imgURL={p.imgURL}
            profilePic={p.profilePic}
            username={p.username}
            description={p.description}
            createdAt={p.createdAt}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;
