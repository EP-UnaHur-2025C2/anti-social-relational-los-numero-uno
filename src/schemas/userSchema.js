const Joi = require("joi")

const nickName = Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .messages({
        "string.min": 'nickname debe tener al menos 3 caracteres',
        "string.max": 'nickname debe tener como máximo 30 caracteres',
        "string.base": 'nickname debe ser un texto',
        "string.alphanum": 'nickname debe estar compuesto únicamente por caracteres alfanuméricos',
        "string.empty": 'nickname no puede estar vacío'
    });

const mail = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
        "string.email": 'mail debe estar compuesto por un mínimo de dos dominios. Ej: loreipsum@outlook.com',
        "string.empty": 'mail no puede estar vacío'
    });

const userSchema = Joi.object({
    nickName: nickName.required().messages({
        "any.required": 'nickname es obligatorio'
    }),
    mail: mail.required().messages({
        "any.required": 'mail es obligatorio'
    })
});

const updateUserSchema = Joi.object({
    nickName,
    mail
});

module.exports = {
    userSchema,
    updateUserSchema
}