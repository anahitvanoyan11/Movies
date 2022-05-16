const Sequelize = require('sequelize');
const db = require('./');
const sequelize = db.sequelize;

module.exports = (sequelize, Sequelize) => {
  const Subscribers = sequelize.define('subscribers', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    movie_id: {
      type: Sequelize.INTEGER,
    },
  });

  return Subscribers;
}