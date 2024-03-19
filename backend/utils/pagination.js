// utils/pagination.js

const calculatePagination = (page = 1, limit = 10, skip = 0) => {
  const offset = (page - 1) * limit + parseInt(skip);
  const nextPage = parseInt(page) + 1;
  const prevPage = parseInt(page) - 1;
  return { offset, nextPage, prevPage };
};

module.exports = { calculatePagination };
