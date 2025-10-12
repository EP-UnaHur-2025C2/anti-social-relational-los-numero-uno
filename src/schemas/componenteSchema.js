const Joi = require("joi");

const createCommentSchema = Joi.object({
  texto: Joi.string().min(1).required().messages({
    "string.base": `El atributo "texto" debe ser un texto`,
    "string.empty": `El texto no puede estar vacío`,
    "any.required": `El comentario debe tener un atributo texto`,
  }),
});

const updateCommentSchema = Joi.object({
  texto: Joi.string().min(1).messages({
    "string.base": `El atributo "texto" debe ser un texto`,
    "string.empty": `El texto no puede estar vacío`,
  }),
  createdAt: Joi.date().iso().messages({
    "date.base": `"createdAt" debe ser una fecha`,
    "date.format": `"createdAt" debe estar en formato ISO 8601 (YYYY-MM-DD)`,
  }),
});

module.exports = {
  createCommentSchema,
  updateCommentSchema,
};