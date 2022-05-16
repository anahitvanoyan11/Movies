const Sequelize = require('sequelize');
const db = require('./');
const sequelize = db.sequelize;

module.exports = (sequelize, Sequelize) => {
  const Seasons = sequelize.define('seasons', {
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

  return Seasons;
}