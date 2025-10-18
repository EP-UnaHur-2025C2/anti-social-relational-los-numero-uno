const genericSchemaValidator = require("../schemas/genericSchemaValidator");
const { postTagSchema } = require("../schemas/postTagSchema");
const mapErrors = require("./mapErrors");
const { PostTag } = require("../../db/models");

const validatePostTagSchema = (req, res, next) => {
  const errores = genericSchemaValidator(postTagSchema, req.params);
  if (errores) {
    res.status(400).json(mapErrors(errores));
    return;
  }
  next();
};

const validarPostTagById = async (req, res, next) => {
  const { postId, tagId } = req.params;
  const postTag = await PostTag.findOne({
    where: { PostId: postId, TagId: tagId },
  });
  if (!postTag) {
    res.status(404).json({
      message: `La asociación entre el post con id ${postId} y la etiqueta con id ${tagId} no existe`,
    });
    return;
  }
  next();
};

module.exports = {
  validatePostTagSchema,
  validarPostTagById
};