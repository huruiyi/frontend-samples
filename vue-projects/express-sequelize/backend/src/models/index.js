const sequelize = require('../config/database');
const User = require('./user.model');

const models = {
 User : User(sequelize)
};

module.exports = {
 sequelize,
 ...models
};
