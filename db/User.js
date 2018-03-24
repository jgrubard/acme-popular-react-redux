const { _conn, Sequelize } = require('./conn');

const User = _conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false

  }
}, {
  timestamps: false
});

module.exports = User;
