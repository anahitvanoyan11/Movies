const Sequelize = require('sequelize');
const db = require('./');
const sequelize = db.sequelize;

module.exports = (sequelize, Sequelize) => {
  const Movies = sequelize.define('movies', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false
    }
  });

  return Movies;
}