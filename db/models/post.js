"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Usuario, { foreignKey: "UsuarioId" });
      Post.hasMany(models.Comment, {
        foreignKey: "PostId",
        onDelete: 'CASCADE'
      });
      Post.hasMany(models.PostImg, {
        foreignKey: "PostId",
        onDelete: 'CASCADE'
      });
      Post.belongsToMany(models.Tag, {
        through: models.PostTag,
        foreignKey: "PostId",
        otherKey: "TagId",
      });
    }
  }
  Post.init(
    {
      texto: { type: DataTypes.STRING, allowNull: false },
      UsuarioId: { type: DataTypes.INTEGER, onDelete: 'CASCADE' },
    },
    {
      sequelize,
      modelName: "Post",
      timestamps: false
    }
  );
  return Post;
};
