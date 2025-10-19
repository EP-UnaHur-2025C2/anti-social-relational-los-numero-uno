'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostImg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostImg.belongsTo(models.Post, { foreignKey: "PostId" });
    }
  }
  PostImg.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PostImg',
    timestamps: false
  });
  return PostImg;
};