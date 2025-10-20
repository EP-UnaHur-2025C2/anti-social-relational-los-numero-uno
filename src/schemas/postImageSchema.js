const Joi = require('joi');

const postImageSchema = Joi.object({
  URL: Joi.string().uri().min(1).required().messages({
    'string.base': 'La URL debe ser una cadena de texto',
    'string.uri': 'La URL debe ser una URL válida',
    'any.required': 'La URL es obligatoria',
    "string.min": "La URL no puede estar vacía"
  }),
});

module.exports = postImageSchema;