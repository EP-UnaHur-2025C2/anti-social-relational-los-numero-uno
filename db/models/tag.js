"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {

      Tag.belongsToMany(models.Post, {
        through: models.PostTag,
        foreignKey: "TagId",
        otherKey: "PostId",
      });
    }
  }
  Tag.init(
    {
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false, // El nombre no puede ser nulo
        unique: true // (UK)
      },
    },
    {
      sequelize,
      modelName: "Tag",
      timestamps: false,
    }
  );
  return Tag;
};
