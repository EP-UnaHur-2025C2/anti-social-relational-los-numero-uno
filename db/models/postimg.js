'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post_Image.belongsTo(models.Post, { foreignKey: "PostId" });
    }
  }
  Post_Image.init({
    url: {type:DataTypes.STRING, allowNull: false},
    PostId: {type:DataTypes.INTEGER, onDelete: 'CASCADE'}
  }, {
    sequelize,
    modelName: 'Post_Image',
    timestamps: false
  });
  return Post_Image;
};