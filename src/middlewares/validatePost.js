const { Post } = require("../db/models");
const {
  postSchema,
  dateSchema,
} = require("../../schemas/postSchema");
const genericSchemaValidator = require("../../schemas/genericSchemaValidator");

const mapErrors = (errores) => {
  return errores.details.map((e) => {
    return { atributo: e.path[0], mensaje: e.message };
  });
};

const validarPost = (req, res, next) => {
  const error = genericSchemaValidator(postSchema, req.body);
  if (error) {
    res.status(400).json(mapErrors(error));
    return;
  }
  next();
};

const validarPostById = async (req, res, next) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) {
    res.status(400).json({
      message: `El post con id ${req.params.id} no existe`,
    });
    return;
  }
  next();
};

const validarFecha = (req, res, next) => {
  const error = genericSchemaValidator(dateSchema, req.body.fecha);
  if (error) {
    res.status(400).json(mapErrors(error));
    return;
  }
  next();
};

const validarUsuario = async (req, res, next) => {
  const usuarioBuscado = req.params.usuario;
  const usuarioEncontrado = await Usuario.findOne({ where: { usuarioBuscado } });
  if (!usuarioEncontrado) {
    res.status(400).json({
      message: `El usuario con id ${usuarioBuscado} no existe`,
    });
    return;
  }
  next();
};

module.exports = {
  validarPost,
  validarPostById,
  validarFecha,
  validarUsuario,
};