import React, { useEffect, useState } from 'react';
import { listPosts } from '../operations/post-operations';
import HomePost from '../components/HomePost';
import Sidebar from '../components/Sidebar';
import NoPostsDisplay from '../components/NoPostsDisplay';
import './css/home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(listPosts());
  }, []);

  return (
    <div className='home-container'>
      <Sidebar />

      <main className='posts-list'>
        {posts.length ? (
          posts.map((p) => (
            <HomePost
              key={p._id}
              imgURL={p.imgURL}
              profilePic={p.profilePic}
              username={p.username}
              description={p.description}
              createdDate={p.createdDate}
            />
          ))
        ) : (
          <NoPostsDisplay />
        )}
      </main>
    </div>
  );
};

export default Home;
