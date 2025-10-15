'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
  
    static associate(models) {
      Usuario.hasMany(models.Post);
    }
  }
  Usuario.init({
    nickName: DataTypes.STRING,
    mail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};