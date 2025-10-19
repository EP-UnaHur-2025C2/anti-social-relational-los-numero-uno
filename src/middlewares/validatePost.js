const { Post } = require("../../db/models");
const {
  postSchema
} = require("../schemas/postSchema");
const genericSchemaValidator = require("../schemas/genericSchemaValidator");

const mapErrors = require("../middlewares/mapErrors");

const validarPost = (req, res, next) => {
  const error = genericSchemaValidator(postSchema, req.body);
  if (error) {
    res.status(400).json(mapErrors(error));
    return;
  }
  next();
};

const validarPostById = async (req, res, next) => {
  const post = await Post.findByPk(req.params.postId);
  if (!post) {
    res.status(404).json({
      message: `El post con id ${req.params.postId} no existe`,
    });
    return;
  }
  next();
};

module.exports = {
  validarPost,
  validarPostById
};