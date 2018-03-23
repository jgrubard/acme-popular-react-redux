const { _conn } = require('./conn');
const User = require('./User');

const sync = () => {
  return _conn.sync({ force: true });
}

const seed = () => {
  return Promise.all([
    User.create({ name: 'Mario', rating: 8}),
    User.create({ name: 'Luigi', rating: 7}),
    User.create({ name: 'Bowser', rating: 4})
  ]);
}

module.exports = {
  sync,
  seed,
  models: {
    User
  }
}
