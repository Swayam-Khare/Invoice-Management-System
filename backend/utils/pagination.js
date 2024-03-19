// utils/pagination.js
const excludeFields = require("./excludeFields");

const calculatePagination = (page = 1, limit = 5, skip = 0, excludedFields = []) => {
  const offset = (page - 1) * limit + parseInt(skip);
  const nextPage = parseInt(page) + 1;
  const prevPage = parseInt(page) - 1;
  return { offset, nextPage, prevPage, excludedFields };
};

module.exports = { calculatePagination };
