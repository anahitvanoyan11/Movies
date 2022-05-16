const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./users.model.js')(sequelize, Sequelize);
db.movies = require('./movies.model.js')(sequelize, Sequelize);
db.seasons = require('./seasons.model.js')(sequelize, Sequelize);
db.episodes = require('./episodes.model.js')(sequelize, Sequelize);
db.subscribers = require('./subscribers.model.js')(sequelize, Sequelize);

//realtions
db.seasons.belongsTo(db.movies, {foreignKey: 'movie_id', onDelete: 'CASCADE', hooks: true});
db.movies.hasMany(db.seasons, {foreignKey: 'movie_id'});

db.episodes.belongsTo(db.seasons, {foreignKey: 'season_id', onDelete: 'CASCADE', hooks: true});
db.seasons.hasMany(db.episodes, {foreignKey: 'season_id'});

db.movies.hasMany(db.subscribers, {foreignKey: 'movie_id'});
db.users.hasMany(db.subscribers, {foreignKey: 'user_id'});
db.subscribers.belongsTo(db.movies, {foreignKey: 'movie_id', onDelete: 'CASCADE', hooks: true});
db.subscribers.belongsTo(db.users, {foreignKey: 'user_id', onDelete: 'CASCADE', hooks: true});

module.exports = db;