const Joi = require("joi");

const dateSchema = Joi.object({
  createdAt: Joi.date().iso().required().messages({
    "any.required": `"createdAt" es obligatorio`,
    "date.base": `"createdAt" debe ser una fecha`,
    "date.format": `"createdAt" debe estar en formato ISO 8601 (YYYY-MM-DD)`,
  }),
});

const postSchema = Joi.object({
    createdAt: dateSchema,
    descripcion: Joi.string().min(1).messages({
        "any.required": `El post debe tener un atributo descripcion`,
        "string.base": `El atributo "descripcion" debe ser un texto`,
        "string.empty": `La descripcion no puede estar vacía`,}),
});

module.exports = {
  postSchema,
  dateSchema,
};