'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post.belongsTo(models.usuario)
      post.belongsToMany(models.tag, {through: "tag"})
      post.hasMany(models.tag, {through: "tag"})
      post.hasMany(models.postImage, {through: "postImg"})
      post.hasMany(models.comment, {through: "comment"})
    }
  }
  post.init({
    texto: {type: DataTypes.TEXT, allowNull:false},
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};