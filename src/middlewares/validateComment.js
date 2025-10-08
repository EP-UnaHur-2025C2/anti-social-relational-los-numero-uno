const Joi = require("joi");
const { Comment } = require("../../db/models");

const createCommentSchema = Joi.object({
  texto: Joi.string().min(1).required().messages({
    "string.base": `"texto" debe ser un texto`,
    "string.empty": `"texto" no puede estar vacío`,
    "any.required": `"texto" es obligatorio`,
  }),
});

const validarText = (req, res, next) => {
  const { error } = createCommentSchema.validate(req.body.texto);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validarComment = async (req, res, next) => {
  const comment = await Comment.findByPk(req.params.commentId);
  if (!comment) {
    return res.status(400).json({ message: `El comentario con id ${req.params.commentId} no existe` });
  }
  next();
};

module.exports = {
  validarText,
  validarComment
};
