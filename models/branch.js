const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AccBranches = sequelize.define('AccBranches', {
  brn_num: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  brn_nam: { type: DataTypes.STRING },
  brn_enm: { type: DataTypes.STRING },
  brn_cntr: { type: DataTypes.STRING },
  brn_key: { type: DataTypes.STRING },
  brn_state: { type: DataTypes.STRING },
  brn_sctr: { type: DataTypes.STRING },
  brn_cntr2: { type: DataTypes.STRING },
  brn_cntr3: { type: DataTypes.STRING },
  brn_citynam: { type: DataTypes.STRING },
  brn_resnam: { type: DataTypes.STRING },
  brn_mob: { type: DataTypes.STRING },
  brn_tel1: { type: DataTypes.STRING },
  brn_tel2: { type: DataTypes.STRING },
  brn_fax: { type: DataTypes.STRING },
  brn_invnum: { type: DataTypes.STRING },
  com_box: { type: DataTypes.STRING },
  com_zip: { type: DataTypes.STRING },
  com_cntry: { type: DataTypes.STRING },
  com_RegName: { type: DataTypes.STRING },
  com_RegNum: { type: DataTypes.STRING },
  com_TaxNum: { type: DataTypes.STRING },
  com_Long: { type: DataTypes.FLOAT },
  com_Lat: { type: DataTypes.FLOAT },
  com_email: { type: DataTypes.STRING, validate: { isEmail: true } },
  brn_img: { type: DataTypes.STRING },
}, {
  tableName: 'AccBranches',
  timestamps: false,
});

module.exports = AccBranches;
