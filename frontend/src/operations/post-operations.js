const DEFAULT_LIST_POSTS_LIMIT = 30;

export const listPosts = () => {
  const posts = [];
  for (let i = 0; i < DEFAULT_LIST_POSTS_LIMIT; i++) {
    posts.push({
      _id: i,
      imgURL: 'test.jpg',
      profilePic: 'test.jpg',
      username: `user${i}`,
      description: 'description description',
      createdDate: new Date(),
    });
  }
  return posts;
};
