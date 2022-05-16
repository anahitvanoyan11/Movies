module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "12345678",
  DB: "serials",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};