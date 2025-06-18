const Sequelize = require("sequelize");
const Quiz = require("./quiz.js");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Quiz = Quiz;
Quiz.initiate(sequelize);
module.exports = db;
