const Sequelize = require("sequelize");
require("dotenv/config");

module.exports = new Sequelize(process.env.DB_Name, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_SERVER,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
      enableArithAbort: true
    }
  },
  port: 1433,
  logging: false
}
);