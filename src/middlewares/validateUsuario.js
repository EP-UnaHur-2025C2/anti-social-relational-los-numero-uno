const { Usuario } = require("../../db/models");
const {
  userSchema,
  updateUserSchema
} = require("../schemas/userSchema.js");
const genericSchemaValidator = require("../schemas/genericSchemaValidator");

const mapErrors = require("./mapErrors");

const validarUser = (req, res, next) => {
  const error = genericSchemaValidator(userSchema, req.body);
  if (error) {
    res.status(400).json(mapErrors(error));
    return;
  }
  next();
};

const validarUserById = async (req, res, next) => {
  const user = await Usuario.findByPk(req.params.userId);
  if (!user) {
    res.status(400).json({
      message: `El user con id ${req.params.userId} no existe`,
    });
    return;
  }
  next();
}; 

const validarUserUpdate = (req, res, next) => {
  const error = genericSchemaValidator(updateUserSchema, req.body);
  if (error) {
    res.status(400).json(mapErrors(error));
    return;
  }
  next();
}

const validarNickName = async (req, res, next) => {
  const { nickName } = req.body;
  if (!nickName) {
    next(); // si no hay nick en el body sigue al siguiente middleware
    return;
  }
  users = await Usuario.findAll({where: {nickName}});
  if (users.length > 0) {
    res.status(400).json({
      message: `El nickName ${nickName} ya existe`,
    });
    return;
  }
  next();
}

module.exports = {
    validarUser,
    validarUserById,
    validarUserUpdate,
    validarNickName
}
