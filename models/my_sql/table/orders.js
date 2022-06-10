const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_code: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: "order_code"
    },
    hid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    user_phone_num: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    box_sn: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "created"
    },
    created_by: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "0",
      comment: "one_id"
    },
    confirm_by: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "0",
      comment: "one_id"
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: true,
    underscored: true, //add

    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "order_code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_code" },
        ]
      },
    ]
  });
};
