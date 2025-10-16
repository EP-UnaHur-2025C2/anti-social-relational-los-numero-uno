const { Usuario } = require("../../db/models"); 

const findAll = async(_, res) => {
    const data = await Usuario.findAll({}); 
    res.status(200).json(data);
};

const findByPk = async(req, res) => {
    const id = req.params.id;
    const data = await Usuario.findByPk(id); 
    res.status(200).json(data);
}

const createUser = async(req, res) => {
    const data = req.body;
    const record = await Usuario.create(data); 
    res.status(201).json(record);
}

const actualizarUser = async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    await Usuario.update(data, { where: { id } });
    const record = await Usuario.findByPk(id); 
    res.status(200).json(record);
}

const eliminarUser = async(req, res) => {
    const id = req.params.id;
    await Usuario.destroy({ where: { id } });
    res.status(204).json();
}

module.exports = {
    findAll, findByPk,
    createUser, actualizarUser,
    eliminarUser
    };