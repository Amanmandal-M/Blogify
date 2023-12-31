const Sequelize = require("sequelize");
const colors = require("colors");
require("dotenv").config();

// Establishing a connection to the MySQL database
const SeqConnection = new Sequelize(
  process.env.MYSQLDATABASE, // Database Name
  process.env.MYSQLUSER, // MySQL Username
  process.env.MYSQLPASSWORD, // MySQL Password
  {
    host: process.env.MYSQLHOST, // MySQL Host
    dialect: "mysql", // Specify the dialect for MySQL
  }
);

// Testing the database connection
SeqConnection.authenticate()
  .then(() => {
    console.log(colors.green("Connected to RDS MySQL database"));
  })
  .catch((error) => {
    console.error(colors.red(`Error connecting to MySQL: ${error}`));
  });

module.exports = { SeqConnection };
