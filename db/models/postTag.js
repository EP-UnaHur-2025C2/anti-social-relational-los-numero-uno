
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    static associate(models) {
      
      PostTag.belongsTo(models.Tag, { // PostTag pertenece a Tag (Clave Foránea TagID)
        foreignKey: 'TagID',
        as: 'tag'
      });
      


      PostTag.belongsTo(models.Post, {
        foreignKey: 'PostID',
        as: 'post'
      });
    }
  }
  PostTag.init({
    PostID: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      allowNull: false
    },
    TagID: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PostTag',
    timestamps: false, 
  });
  return PostTag;
};