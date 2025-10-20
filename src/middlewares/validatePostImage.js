const genericSchemaValidator = require('../schemas/genericSchemaValidator');
const {postImageSchema, addImagesSchema} = require('../schemas/postImageSchema');
const { Post_Image } = require('../../db/models');
const mapErrors = require('../middlewares/mapErrors');

const validatePostImage = (req, res, next) => {
  const errores = genericSchemaValidator(postImageSchema, req.body);
  if (errores) {
    res.status(400).json(mapErrors(errores));
    return;
  }
  next();
}

const validateAddImages = (req, res, next) => {
  const errores = genericSchemaValidator(addImagesSchema, req.body);
  if (errores) {
    res.status(400).json(mapErrors(errores));
    return;
  }
  next();
}

const validarPostImageById = async (req, res, next) => {
  const { imageId } = req.params;
  const image = await Post_Image.findByPk(imageId);
  if (!image) {
    res.status(404).json({ message:`La imagen con id ${imageId} no existe`});
    return; 
  }
  next();
}

const validarPostImageAssociation = (req, res, next) => {
  const { postId, imageId } = req.params;
  const image = Post_Image.findOne({ where: { ID: imageId, PostID: postId } });
  if (!image) {
    return res.status(404).json({ message: `La imagen con id ${imageId} no esta asociada al post con id ${postId}` });
  }
  next();
}
module.exports = {
  validatePostImage,
  validarPostImageById,
  validarPostImageAssociation,
  validateAddImages
};