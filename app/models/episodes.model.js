const Sequelize = require('sequelize');
const db = require('./');
const sequelize = db.sequelize;

module.exports = (sequelize, Sequelize) => {
  const Episodes = sequelize.define('episodes', {
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

  return Episodes;
}