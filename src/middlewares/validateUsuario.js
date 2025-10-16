const { user } = require("../db/models");
const {
  userSchema,
} = require("../../schemas/user.schema.js");
const genericSchemaValidator = require("../../schemas/genericSchemaValidator");

const mapErrors = (errores) => {
  return errores.details.map((e) => {
    return { atributo: e.path[0], mensaje: e.message };
  });
};

const validarUser = (req, res, next) => {
  const error = genericSchemaValidator(userSchema, req.body);
  if (error) {
    res.status(400).json(mapErrors(error));
    return;
  }
  next();
};

const validarUserById = async (req, res, next) => {
  const post = await user.findByPk(req.params.id);
  if (!post) {
    res.status(400).json({
      message: `El user con id ${req.params.id} no existe`,
    });
    return;
  }
  next();
}; 

modules.export = {
    validarUser,
    validarUserById
}
