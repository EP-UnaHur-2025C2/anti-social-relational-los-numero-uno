'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Image extends Model {

    static associate(models) {
      Post_Image.belongsTo(models.Post)
    }
  }
  Post_Image.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post_Image',
  });
  return Post_Image;
};