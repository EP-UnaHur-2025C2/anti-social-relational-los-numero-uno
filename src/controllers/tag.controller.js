const { Tag } = require("../../db/models");

// 1. CREAR TAG
const createTag = async (req, res) => {
    const data = req.body;
    const record = await Tag.create(data);
    res.status(201).json(record);
};

// 2. OBTENER TODAS LAS TAGS
const getAllTags = async (_, res) => {
    const data = await Tag.findAll({});
    res.status(200).json(data);
};

// 3. OBTENER TAG POR ID
const getTagById = async (req, res) => {
    const id = req.params.tagId;
    const data = await Tag.findByPk(id);
    res.status(200).json(data);
};

// 4. ACTUALIZAR
const updateTag = async (req, res) => {
    const id = req.params.tagId;
    const data = req.body;
    await Tag.update(data, { where: { id } });
    const record = await Tag.findByPk(id);
    res.status(200).json(record);
};

// 5. ELIMINAR
const deleteTag = async (req, res) => {
    const id = req.params.tagId;
    await Tag.destroy({ where: { id } });
    res.status(204).json();
};

module.exports = {
    createTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag,
};
