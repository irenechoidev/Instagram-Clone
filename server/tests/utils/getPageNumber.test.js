const { getPageNumber } = require('../../src/utils/getPageNumber');

test('when_Getting_Page_Number_Page_Is_Undefined', () => {
  const page = undefined;
  const pageNumber = getPageNumber(page);
  expect(pageNumber).toBe(1);
});

test('when_Getting_Page_Number_Page_Is_Negative', () => {
  const page = -1;
  const pageNumber = getPageNumber(page);
  expect(pageNumber).toBe(1);
});

test('when_Getting_Page_Number_Page_Is_Positive', () => {
  const page = 3;
  const pageNumber = getPageNumber(page);
  expect(pageNumber).toBe(page);
});
