const { Comment } = require("../../db/models");
const {
  createCommentSchema,
  updateCommentSchema,
  dateSchema
} = require("../schemas/componenteSchema");
const genericSchemaValidator = require("../schemas/genericSchemaValidator");

const mapErrors = require("./mapErrors");

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
    res.status(404).json({
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
  const errores = genericSchemaValidator(dateSchema, req.params);
  if (errores) {
    res.status(400).json(mapErrors(errores));
    return;
  }
  next();
}

const validarUserAssociationById = async (req, res, next) => {
  const commentId = req.params.commentId;
  const userId = req.params.userId;
  const comment = await Comment.findOne({
    where: { id: commentId, UsuarioId: userId },
  });
  if (!comment) {
    res.status(403).json({
      message: `El usuario con id ${userId} no está asociado al comentario con id ${commentId}`,
    });
    return;
  }
  next();
}
module.exports = {
  validarCreateCommentSchema,
  validarCommentById,
  validarUpdateCommentSchema,
  validarDate,
  validarUserAssociationById,
};
