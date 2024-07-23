import React from 'react';
import Post from '../components/Post';

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
    <div>
      {listOfPosts.map((p) => (
        <Post
          imgURL={p.imgURL}
          profilePic={p.profilePic}
          username={p.username}
          description={p.description}
          createdAt={p.createdAt}
        />
      ))}
    </div>
  );
};

export default Home;
