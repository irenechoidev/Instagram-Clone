import { getCommentsText, getLikesText } from '../../src/utils/formatText';

test('when_Formatting_Likes_Text_Likes_Count_Is_More_Than_One', () => {
  const likesCount = 2;
  const likesText = getLikesText(likesCount);
  expect(likesText).toBe('2 likes');
});

test('when_Formatting_Likes_Text_Likes_Count_Is_One', () => {
  const likesCount = 1;
  const likesText = getLikesText(likesCount);
  expect(likesText).toBe('1 like');
});

test('when_Formatting_Likes_Text_Likes_Count_Is_Zero', () => {
  const likesCount = 0;
  const likesText = getLikesText(likesCount);
  expect(likesText).toBe('');
});

test('when_Formatting_Comments_Text_Comments_Count_Is_More_Than_One', () => {
  const commentsCount = 2;
  const commentsText = getCommentsText(commentsCount);
  expect(commentsText).toBe('View all 2 comments');
});

test('when_Formatting_Comments_Text_Comments_Count_Is_One', () => {
  const commentsCount = 1;
  const commentsText = getCommentsText(commentsCount);
  expect(commentsText).toBe('View 1 comment');
});

test('when_Formatting_Comments_Text_Comments_Count_Is_Zero', () => {
  const commentsCount = 0;
  const commentsText = getCommentsText(commentsCount);
  expect(commentsText).toBe('Add a comment...');
});
