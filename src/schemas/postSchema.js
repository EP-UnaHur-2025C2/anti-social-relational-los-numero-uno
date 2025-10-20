const Joi = require("joi");
const { tagSchema } = require("./tagSchema");
const  postImageSchema  = require("./postImageSchema");

const postSchema = Joi.object({
  texto: Joi.string().min(1).required().messages({
    "any.required": `El post debe tener un atributo texto`,
    "string.base": `El atributo "texto" debe ser un texto`,
    "string.empty": `El texto no puede estar vacío`,
    "string.min": `El texto debe tener al menos 1 caracter`,
  }),
  
  PostImgs: Joi.array().items(postImageSchema).min(1).messages({
      "array.base": `El atributo "PostImgs" debe ser un array de URLs`,
      "array.min": `El array de PostImgs debe tener al menos un elemento`,
    })
    .optional(),
  
  Tags: Joi.array().items(tagSchema).min(1).unique((a, b) => a.Nombre === b.Nombre).messages({
    "array.base": `El atributo "tags" debe ser un array de objetos a crear`,
    "array.min": `El array de tags debe tener al menos un elemento`,
    "array.unique": `El array de tags no debe contener elementos duplicados`
  }),
});

module.exports = {
  postSchema,
};
