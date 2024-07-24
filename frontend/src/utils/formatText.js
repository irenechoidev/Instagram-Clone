export const getLikesText = (likesCount) => {
  if (!likesCount) return '';
  else if (likesCount === 1) return `${likesCount} like`;

  return `${likesCount} likes`;
};

export const getCommentsText = (commentCount) => {
  if (!commentCount) return 'Add a comment...';
  else if (commentCount === 1) return `View ${commentCount} comment`;

  return `View ${commentCount} comments`;
};
