const { Comment } = require("../../db/models");
const {
  createCommentSchema,
  updateCommentSchema,
  dateSchema
} = require("../schemas/componenteSchema");
const genericSchemaValidator = require("../schemas/genericSchemaValidator");

const mapErrors = (errores) => {
  return errores.details.map((e) => {
    return { atributo: e.path[0], mensaje: e.message };
  });
};

const validarCreateCommentSchema = (req, res, next) => {
  const errores = genericSchemaValidator(createCommentSchema, req.body);
  if (errores) {
    res.status(400).json(mapErrors(errores));
    return;
  }
  next();
};

const validarCommentById = async (req, res, next) => {
  const comment = await Comment.findByPk(req.params.commentId);
  if (!comment) {
    res.status(400).json({
      message: `El comentario con id ${req.params.commentId} no existe`,
    });
    return;
  }
  next();
};

const validarUpdateCommentSchema = (req, res, next) => {
  const errores = genericSchemaValidator(updateCommentSchema, req.body);
  if (errores) {
    res.status(400).json(mapErrors(errores));
    return;
  }
  next();
};

const validarDate = (req, res, next) => {
  const errores = genericSchemaValidator(dateSchema, req.body);
  if (errores) {
    res.status(400).json(mapErrors(errores));
    return;
  }
  next();
}
module.exports = {
  validarCreateCommentSchema,
  validarCommentById,
  validarUpdateCommentSchema,
  validarDate
};
