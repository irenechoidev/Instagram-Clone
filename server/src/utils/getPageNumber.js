exports.getPageNumber = (page) => {
  if (!page || page <= 0) return 1;
  return page;
};
