const Joi = require("joi")

const userSchema = Joi.object({
    nickname: Joi.string()
        .alphanum()
        .min(3)
        .max(30).messages({
            "any.required": 'nickname es obligatorio',
            "nickname.base": 'nickname debe estar compuesto únicamente por caracteres alfanuméricos',
            "nickname.empty": 'nickname no puede estar vacío'
        }),
    
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({
        "any.required": 'nickname es obligatorio',
        "email.base": 'email debe estar compuesto por un mínimo de dos dominios. Ej: loreipsum@outlook.com',
        "email.empty": 'email no puede estar vacío'
    })
})

modules.export = {
    usernameSchema
}