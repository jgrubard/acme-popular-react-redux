const { _conn, Sequelize } = require('./conn');

const User = _conn.define('user', {
  name: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

module.exports = User;
