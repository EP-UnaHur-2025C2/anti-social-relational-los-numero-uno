'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    static associate(models) {
      PostTag.belongsTo(models.Tag, { // PostTag pertenece a Tag (Clave Foránea TagId)
        foreignKey: 'TagId'
      });
      PostTag.belongsTo(models.Post, {
        foreignKey: 'PostId'
      }); // Asociación agregada con Post (muchos a uno)
    }
  }

  PostTag.init({
    
  }, {
    sequelize,
    modelName: 'PostTag',
    timestamps: false, 
  });
  return PostTag;
};