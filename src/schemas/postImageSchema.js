const Joi = require('joi');

const postImageSchema = Joi.object({
  url: Joi.string().uri({ scheme: ['http','https'] }).min(1).required()
    .messages({
      'string.base': 'La URL debe ser una cadena de texto',
      'string.uriCustomScheme': 'La URL debe ser una URL válida (http o https)',
      'string.empty': 'La URL no puede estar vacía',
      'any.required': 'La URL es obligatoria',
      'string.min': 'La URL no puede estar vacía'
    }),
});

const addImagesSchema = Joi.object({
  images: Joi.array().items(postImageSchema).min(1).required()
    .messages({
      'array.base': 'Las imágenes deben ser un arreglo',
      'array.min': 'Debe haber al menos una imagen',
      'any.required': 'El campo imágenes es obligatorio'
    }),
});
module.exports = {postImageSchema, addImagesSchema};