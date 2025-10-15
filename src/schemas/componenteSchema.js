const Joi = require("joi");

const textoSchema = Joi.string().min(1).messages({
  "string.base": `El atributo "texto" debe ser un texto`,
  "string.empty": `El texto no puede estar vacío`,
});

const baseCommentSchema = {
  texto: textoSchema,
  createdAt: Joi.date().iso().messages({
    "date.base": `"createdAt" debe ser una fecha`,
    "date.format": `"createdAt" debe estar en formato ISO 8601 (YYYY-MM-DD)`,
  }),
};

const createCommentSchema = Joi.object({
  ...baseCommentSchema,
  texto: textoSchema.required().messages({
    "any.required": `El comentario debe tener un atributo texto`,
  }),
});

const updateCommentSchema = Joi.object(baseCommentSchema);

const dateSchema = Joi.object({
  createdAt: Joi.date()
    .iso()
    .max("now")
    .required()
    .messages({
      "any.required": `"createdAt" es obligatorio`,
      "date.base": `"createdAt" debe ser una fecha`,
      "date.format": `"createdAt" debe estar en formato ISO 8601 (YYYY-MM-DD)`,
      "date.max": `"createdAt" no puede ser una fecha futura`,
    }),
});

module.exports = {
  createCommentSchema,
  updateCommentSchema,
  dateSchema,
};