const { v4: uuidv4 } = require('uuid');

exports.uniqueTransaction = () => {
    return uuidv4();
}