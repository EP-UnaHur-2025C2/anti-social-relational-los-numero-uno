const { where, Op} = require("sequelize");
const { Post, Comment, Post_Image, Tag } = require("../db/models");

const findAll = async (_, res) => {
  const data = await Post.findAll({
    include: [
        {
          model: Comment,
          as: "Comentarios",
          attributes: ["texto"],
        },
        {
          model: Post_Image,
          as: "Imagenes",
          attributes: ["url"]
        },
        {
          model: Tag,
          attributes: ["nombre"]
        }
      ],
  });
  res.status(200).json(data);
};

const findByPk = async (req, res) => {
  const id = req.params.id;
  const data = await Post.findByPk(id,{
      include: [
        {
          model: Comment,
          attributes: ["texto"],
        },
        {
          model: Post_Image,
          attributes: ["url"]
        },
        {
          model: Tag,
          attributes: ["nombre"]
        }
      ],
  });
  res.status(200).json(data);
};

const verDesdeFecha = async (req, res) => {
  const fecha =  req.query.fecha; // '2023-10-01'
  console.log(fecha);
  const fechaConvertida = new Date(fecha);
  const data = await Post.findAll({ 
    where: { 
      createdAt: { [Op.gte]: fechaConvertida } 
    } 
  });
  res.status(200).json(data);
};

const crearPost = async (req, res) => {
  const data = req.body;
  const record = await Post.create(data);
  res.status(201).json(record);
};

const actualizarPost = async (req, res) => {
  const post = await Post.findByPk(req.params.id)
  await post.update(req.body)
  res.json(post)
}

const eliminarPost = async (req, res) => {
  const post = await Post.findByPk(req.params.id)
  await post.destroy()
  res.json({ message: 'Post eliminado correctamente' })
}

module.exports = { findAll, findByPk, crearPost, actualizarPost, eliminarPost, verDesdeFecha };
