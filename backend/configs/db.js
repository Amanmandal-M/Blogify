const Sequelize = require('sequelize');
require('dotenv').config();

// Establishing a connection to the MySQL database
const SeqConnection = new Sequelize(
  process.env.MYSQLDATABASE,  // Database Name
  process.env.MYSQLUSER,      // MySQL Username
  process.env.MYSQLPASSWORD,  // MySQL Password
  {
    host: process.env.MYSQLHOST,  // MySQL Host
    dialect: "mysql",             // Specify the dialect for MySQL
  }
);

// Testing the database connection
SeqConnection.authenticate()
  .then(() => {
    console.log("Connected to MySQL");
  })
  .catch((error) => {
    console.error(`Error connecting to MySQL: ${error}`);
  });

module.exports = { SeqConnection };
