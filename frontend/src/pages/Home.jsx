import React, { useEffect, useState } from 'react';
import { listPosts } from '../operations/post-operations';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import NoPostsDisplay from '../components/NoPostsDesplay';
import './css/home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts([]);
  }, []);

  return (
    <div className='home-container'>
      <Sidebar />

      <main className='posts-list'>
        {posts.length ? (
          posts.map((p) => (
            <Post
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
