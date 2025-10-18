const Joi = require("joi");

const postTagSchema = Joi.object({
  postId: Joi.number().integer().positive().required().messages({
    "number.base": '"postId" debe ser un número',
    "number.integer": '"postId" debe ser un número entero',
    "number.positive": '"postId" debe ser un número positivo',
    "any.required": '"postId" es un campo obligatorio',
  }),
  tagId: Joi.number().integer().positive().required().messages({
    "number.base": '"tagId" debe ser un número',
    "number.integer": '"tagId" debe ser un número entero',
    "number.positive": '"tagId" debe ser un número positivo',
    "any.required": '"tagId" es un campo obligatorio',
  }),
});

module.exports = {
  postTagSchema,
};
