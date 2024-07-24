const { createUpload } = require('../../src/utils/createUpload');

test('when_Creating_Upload_Return_Value_Is_Not_Null', () => {
  const upload = createUpload();
  expect(upload).not.toBeNull();
});
