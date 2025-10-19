const Joi = require("joi");
const { tagSchema } = require("./tagSchema");

const tagAssociationSchema = Joi.object({
  Tags: Joi.array().items(tagSchema).min(1).unique((a, b) => a.Nombre === b.Nombre).messages({
    "array.base": `El atributo "tags" debe ser un array de objetos a crear`,
    "array.min": `El array de tags debe tener al menos un elemento`,
    "array.unique": `El array de tags no debe contener elementos duplicados`
  }),
});
module.exports = {
  tagAssociationSchema
};
