const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    secret: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    expired_min: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'member',
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
    ]
  });
};
