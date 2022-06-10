const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('otp', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    refno: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    pin: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    sent_to: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "receiver phone number"
    },
    order_code: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'otp',
    timestamps: true,
    underscored: true, //add
    updatedAt: false,

    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
