const { Sequelize } = require("sequelize");
const dbConfig = require("./appConfig.js");

// initialize sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

// test the connection
sequelize.authenticate()
  .then(() => {
    console.log("Connection to the database was successfull.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;


/* const { Sequelize } = require("sequelize");
const log = require("npmlog");
const dbConfig = require("./appConfig.js");

// initialize sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

// test the connection
sequelize.authenticate()
  .then(() => log.info("db", "Connection to the database was successfull."))
  .catch(err => log.error("db", "Connection failed:", err));


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Posts = require("../models/postsModel.js")(sequelize, Sequelize);

module.exports = db; */


