import React from 'react';
import Sidebar from '../components/Sidebar';
import DetailsPost from '../components/DetailsPost';
import Comment from '../components/Comment';
import AddComment from '../components/AddComment';
import './css/post-details.css';

const PostDetails = () => {
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

        <div className='post-details-comments'>
          <Comment
            imgURL='/test.jpg'
            username='Username'
            createdDate={new Date()}
          />
          <Comment
            imgURL='/test.jpg'
            username='Username'
            createdDate={new Date()}
          />
          <Comment
            imgURL='/test.jpg'
            username='Username'
            createdDate={new Date()}
          />
        </div>

        <AddComment />
      </main>
    </div>
  );
};

export default PostDetails;
