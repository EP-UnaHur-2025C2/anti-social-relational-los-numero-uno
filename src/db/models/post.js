'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
  
    static associate(models) {
      Post.belongsTo(models.Usuario)
      Post.belongsToMany(models.Tag, {through:"PostTags" } ) //alias
      Post.hasMany(models.Post_Image , {as:"Imagenes"} ) //alias
      Post.hasMany(models.Comment, {as:"Comentarios"} ) //alias 
    }
  }
  Post.init({
    descripcion: {type:DataTypes.STRING,allowNull:false}, 
    texto: {type:DataTypes.TEXT,allowNull:true} //Tipo de dato TEXT permite mas caracteres
  }, {
    sequelize,
    modelName: 'Post',
    timestamps:true,
  });
  return Post;
};