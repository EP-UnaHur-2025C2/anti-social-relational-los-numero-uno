'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postImg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      postImg.belongsTo(models.post)
    }
  }
  postImg.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'postImg',
  });
  return postImg;
};