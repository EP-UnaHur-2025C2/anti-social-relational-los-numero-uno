'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
  
    static associate(models) {
      Comment.belongsTo(models.Post)
    }
  }
  Comment.init({
    texto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};