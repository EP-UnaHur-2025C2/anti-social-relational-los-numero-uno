"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Comment.belongsTo(models.User, { foreignKey: "userId" });
      //Comment.belongsTo(models.Post, { foreignKey: "postId" });
    }
  }
  Comment.init(
    {
      texto: { type: DataTypes.STRING, allowNull: false },
      visible: {
        type: DataTypes.VIRTUAL(DataTypes.BOOLEAN, ["createdAt"]),
        get: function () {
          const creationDate = new Date(this.getDataValue("createdAt"));
          const now = new Date();
          const diffTiempo = now - creationDate; //Diferencia en milisegundos
          const diffMeses = Math.floor(
            diffTiempo / (1000 * 60 * 60 * 24 * 30)
          ); //Diferencia en meses
          console.log("Diferencia en meses: ", diffMeses);
          const varEntorno = process.env.DURACION_COMENTARIO_VISIBLE || 6;
          return diffMeses <= varEntorno;
        },
      },
      createdAt: { type: DataTypes.DATEONLY, allowNull: false },
      updatedAt: { type: DataTypes.DATEONLY, allowNull: false },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
