'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.Post, { foreignKey: "UsuarioId" });
      Usuario.hasMany(models.Comment, { foreignKey: "UsuarioId" });
    }
  }
  Usuario.init({
    nickName: {type: DataTypes.STRING, allowNull: false, unique: true},
    mail: {type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'Usuario',
    timestamps: false
  });
  return Usuario;
};