const Sequelize = require("sequelize");
require("dotenv/config");

module.exports = new Sequelize('ladycareyear012024', 'sa', '123456aA@', {
  host: '158.220.90.76',
  dialect: 'mssql',
  // dialectOptions: {
  //   options: {
  //     encrypt: false, // or true, depending on your setup
  //     trustServerCertificate: true, // use this for self-signed certificates
  //   },
  // },
  port: 1433,
  logging : false
}
);