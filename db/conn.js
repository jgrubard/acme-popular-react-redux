const Sequelize = require('sequelize');
const _conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_popular_react_redux_db');

module.exports = {
  Sequelize,
  _conn
};
