const Joi = require("joi")

const nombre = Joi.string()
    .min(1)
    .max(30)
    .messages({
        "string.min": 'nombre debe tener al menos 1 caracter',
        "string.max": 'nombre debe tener como máximo 30 caracteres',
        "string.base": 'nombre debe ser un texto',
        "string.empty": 'nombre no puede estar vacío'
    });

const tagSchema = Joi.object({
    Nombre: nombre.required().messages({
        "any.required": 'nombre es obligatorio'
    })
});

module.exports = {
    tagSchema
}
