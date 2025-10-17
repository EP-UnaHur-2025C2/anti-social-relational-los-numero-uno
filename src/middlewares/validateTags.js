const {tagSchema} = require('../schemas/tagSchema');
const genericSchemaValidator = require('../schemas/genericSchemaValidator');
const mapErrors = require('./mapErrors');
const { Tag } = require('../../db/models');

const validarTag = (req, res, next) => {
    const error = genericSchemaValidator(tagSchema, req.body);
    if (error) {
        res.status(400).json(mapErrors(error));
        return;
    }
    next();
};

const validarUpdateTag = (req, res, next) => {
    const error = genericSchemaValidator(tagSchema, req.body);
    if (error) {
        res.status(400).json(mapErrors(error));
        return;
    }
    next();
};

const validarNombreTag = async (req, res, next) => {
    const { Nombre } = req.body;
    if (!Nombre) {
        next(); // si no hay nombre en el body sigue al siguiente middleware
        return;
    }
    const tags = await Tag.findAll({where: {Nombre}});
    if (tags.length > 0) {
        res.status(400).json({
            message: `La tag con nombre ${Nombre} ya existe`,
        });
        return;
    }
    next();
}

const validarTagByid = async (req, res, next) => {
    const tag = await Tag.findByPk(req.params.tagId);
    if (!tag) {
        res.status(400).json({
            message: `La tag con id ${req.params.tagId} no existe`,
        });
        return;
    }
    next();
};

module.exports = {
    validarTag,
    validarUpdateTag,
    validarNombreTag,
    validarTagByid
};