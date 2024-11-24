const Sequelize = require("sequelize");
require("dotenv/config");

module.exports = new Sequelize('ladycareyear012024', 'sa', '123456', {
  host: 'localhost',
  dialect: 'mssql',
  port : 1433,
  logging : false
}
);