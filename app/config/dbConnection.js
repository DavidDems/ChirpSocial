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


