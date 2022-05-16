const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('./');
const sequelize = db.sequelize;

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    full_name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    password: {
      type: Sequelize.STRING(70),
      allowNull: true
    }
  });

  User.beforeCreate(async (user) => {
    user.password && (user.password = await bcrypt.hash(user.password, 10));
  });

  return User;
}