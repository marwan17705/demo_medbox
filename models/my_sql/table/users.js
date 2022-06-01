const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fname_en: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    lname_en: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    fname_th: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    lname_th: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    phone_num: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: "phone_num"
    },
    lat: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    lng: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "0",
      comment: "one_id"
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: "phone_num",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone_num" },
        ]
      },
    ]
  });
};
