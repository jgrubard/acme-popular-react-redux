const { _conn, Sequelize } = require('./conn');

const User = _conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'That name is alredy in use!'
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
    allowNull: {
      args: false,
      msg: 'Please enter a rating'
    },
    validate: {
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
      }
    }


  }
}, {
  timestamps: false
});

module.exports = User;
