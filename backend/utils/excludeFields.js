// utils/excludeFields.js

// Function to generate options for excluding fields from Sequelize queries
const excludeFields = (fieldsToExclude) => {
  return {
    attributes: {
      exclude: fieldsToExclude,
    },
  };
};

module.exports = excludeFields;
