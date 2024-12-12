const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categories = sequelize.define('InvCategSub', {
  cats_cat: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  cats_num: { type: DataTypes.INTEGER, allowNull: false },
  cats_nam: { type: DataTypes.STRING },
  cats_enm: { type: DataTypes.STRING },
  cats_key: { type: DataTypes.STRING },
  cats_state: { type: DataTypes.STRING },
}, {
  tableName: 'InvCategSub',
  timestamps: false,
});

module.exports = Categories;
