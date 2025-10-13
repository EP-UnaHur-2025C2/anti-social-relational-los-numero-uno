const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Post = require("./post"); //cambiar en caso de corresponder, si el encargado del post le da otro nombre 

const Post_Image = sequelize.define("Post_Image", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  URL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PostID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: "ID",
    },
    onDelete: "CASCADE",
  },
}, {
  tableName: "Post_Image",
  timestamps: false,
});


Post.hasMany(Post_Image, { foreignKey: "PostID" });
Post_Image.belongsTo(Post, { foreignKey: "PostID" });

module.exports = Post_Image;
