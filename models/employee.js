const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TempInfo = sequelize.define('Temp_info', {
  emp_num: { type: DataTypes.STRING },
  emp_namar: { type: DataTypes.STRING },
  emp_namen: { type: DataTypes.STRING },
  emp_mobile: { type: DataTypes.STRING },
  emp_email: { type: DataTypes.STRING },
  emp_stat: { type: DataTypes.STRING },
  SETION_NUM: { type: DataTypes.INTEGER },
  JOP_NUM: { type: DataTypes.INTEGER },
  user_num: { type: DataTypes.INTEGER },
  emp_trget: { type: DataTypes.FLOAT },
  emp_prcent: { type: DataTypes.FLOAT },
  emp_key: { type: DataTypes.INTEGER,primaryKey: true },
  emp_des: { type: DataTypes.STRING },
  emp_img: { type: DataTypes.STRING },
}, {
  tableName: 'Temp_info',
  timestamps: false,
});

module.exports = TempInfo;
