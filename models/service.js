const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InvmItems = sequelize.define('InvmItems', {
  itm_srl: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  itm_barcode: { type: DataTypes.STRING },
  itm_catg: { type: DataTypes.STRING },
  itm_subcatg: { type: DataTypes.STRING },
  itm_nam: { type: DataTypes.STRING },
  itm_enm: { type: DataTypes.STRING },
  itm_typpur: { type: DataTypes.BOOLEAN },
  itm_typsal: { type: DataTypes.BOOLEAN },
  itm_typinv: { type: DataTypes.BOOLEAN },
  itm_typser: { type: DataTypes.BOOLEAN },
  itm_typpak: { type: DataTypes.BOOLEAN },
  itm_typrpak: { type: DataTypes.BOOLEAN },
  itm_size: { type: DataTypes.STRING },
  itm_model: { type: DataTypes.STRING },
  itm_msr: { type: DataTypes.STRING },
  itm_color: { type: DataTypes.STRING },
  itm_descr1: { type: DataTypes.TEXT },
  itm_descr2: { type: DataTypes.TEXT },
  itm_cntry: { type: DataTypes.STRING },
  itm_supL1: { type: DataTypes.STRING },
  itm_supL2: { type: DataTypes.STRING },
  itm_supL3: { type: DataTypes.STRING },
  itm_supL4: { type: DataTypes.STRING },
  itm_minqty: { type: DataTypes.INTEGER },
  itm_reordqty: { type: DataTypes.INTEGER },
  itm_maxqty: { type: DataTypes.INTEGER },
  itm_onordrqty: { type: DataTypes.INTEGER },
  itm_state: { type: DataTypes.STRING },
  itm_key: { type: DataTypes.STRING },
  itm_avgucst: { type: DataTypes.FLOAT },
  itm_defucst: { type: DataTypes.FLOAT },
  itm_dscnt: { type: DataTypes.FLOAT },
  itm_hassrl: { type: DataTypes.BOOLEAN },
  itm_lngth: { type: DataTypes.FLOAT },
  itm_wdth: { type: DataTypes.FLOAT },
  itm_untOpt: { type: DataTypes.STRING },
  itm_dscntPerc: { type: DataTypes.FLOAT },
  itm_ref: { type: DataTypes.STRING },
  itm_asmLVL: { type: DataTypes.STRING },
  itm_unit: { type: DataTypes.STRING },
  itm_eunt: { type: DataTypes.STRING },
  itm_pak: { type: DataTypes.STRING },
  itm_conv: { type: DataTypes.FLOAT },
  itm_prc1: { type: DataTypes.FLOAT },
  itm_prc2: { type: DataTypes.FLOAT },
  itm_prc3: { type: DataTypes.FLOAT },
  itm_prCUOINT: { type: DataTypes.FLOAT },
  itm_mrktprc: { type: DataTypes.FLOAT },
  itm_statprc: { type: DataTypes.FLOAT },
  itm_lpprc: { type: DataTypes.FLOAT },
  itm_supnum: { type: DataTypes.STRING },
  itm_despu: { type: DataTypes.TEXT },
  itm_dessal: { type: DataTypes.TEXT },
  itm_IMG: { type: DataTypes.STRING },
  ChassisNo: { type: DataTypes.STRING },
  SerialNumber: { type: DataTypes.STRING },
  km: { type: DataTypes.INTEGER },
  carused_sate: { type: DataTypes.STRING },
}, {
  tableName: 'InvmItems',
  timestamps: false,
});

module.exports = InvmItems;
