const { _conn, Sequelize } = require('./conn');

const User = _conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'That name is already in use!'
    },
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter a name!'
      }
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      not: ['[a-z]', 'i'],
      isNumeric: {
        args: true,
        msg: 'Please enter numeric characters only'
      },
      isInt: {
        args: true,
        msg: 'Please enter integers only'
      },
      min: {
        args: 1,
        msg: 'Please choose a number between 1 and 10'
      },
      max: {
        args: 10,
        msg: 'Please choose a number between 1 and 10'
      },
    }
  }
}, {
  timestamps: false
});

module.exports = User;
