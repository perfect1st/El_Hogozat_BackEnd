const Sequelize = require("sequelize");
require("dotenv/config");

module.exports = new Sequelize('ladycareyear012024', 'sa', '123456aA@', {
  host: '158.220.90.76',
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