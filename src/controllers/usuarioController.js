const { user } = require(".../db/models");

const findAll = async(_, res) => {
    const data = await user.findAll({});
    res.status(200).json(data);

};

const findByPk = async(req, res) => {
    const id = req.params.id;
    const data = user.findByPk(id);
    res.status(200).json(data);
    include: [{
        model: usuario,
        as: "Usuario",
        attributes: ["nickName"]
    }];
}

const createUser = async(req, res) => {
    const data = req.body;
    const record = await user.create(data);
    res.status(201).json(record);
}

const actualizarUser = async(req, res) => {
    const user = await user.findByPk(req.params.id)
    await user.update(req.body)
    res.status(201).json(user)
}

const eliminarUser = async(req, res) => {
    const user = await user.findByPk(req.params.id)
    await user.destroy()
    res.status(200).json({ message: 'Usuario eliminado correctamente' })
}


module.exports = {
    findAll, findByPk,
    createUser, actualizarUser,
    eliminarUser
    };