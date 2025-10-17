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

const findByPkVisibles = async (req, res) => {
  const id = req.params.id;
  const data = await Post.findByPk(id,{
      include: [
        {
          model: Comment,
          as: "Comentarios",
          attributes: ["texto"],
          where: { visible: true }
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

const verDesdeFecha = async (req, res) => {
  const fecha =  req.body.fecha; // '2023-10-01'
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

  //Crear el Post
  const post = await Post.create({
    descripcion: data.descripcion,
    texto: data.texto,
    UsuarioId: req.Usuario.Id,
  });

  //Crear comentarios
  const promesasComentarios = [];
  data.comentarios.forEach((element) => {
    promesasComentarios.push(
      Comment.create({
        texto: element.texto,
      })
    );
  });
  const comentarios = await Promise.all(promesasComentarios);
  await post.addComentarios(comentarios);

  //Crear o encontrar tags
  const promesasTags = [];
  data.tags.forEach((element) => {
    promesasTags.push(
      Tag.findOrCreate({
        where: { nombre: { [Op.eq]: element.nombre } },
        defaults: element,
      })
    );
  });
  const resultTags = await Promise.all(promesasTags);
  const tags = resultTags.map(([tag]) => tag);
  await post.addTags(tags);

  //Crear imágenes
  const promesasImagenes = [];
  data.imagenes.forEach((element) => {
    promesasImagenes.push(
      Post_Image.create({
        url: element.url,
      })
    );
  });
  const imagenes = await Promise.all(promesasImagenes);
  await post.addImagenes(imagenes);

  //Devolver el post con asociaciones
  res.status(201).json({
    ...post.dataValues,
    comentarios: await post.getComentarios({ joinTableAttributes: [] }),
    tags: await post.getTags({ joinTableAttributes: [] }),
    imagenes: await post.getImagenes({ joinTableAttributes: [] }),
  });
};

const agregarImagenes = async (req, res) => {
  const data = req.body;
  const post = await Post.findByPk(req.params.id);

  const promesas = [];
  data.imagenes.forEach((img) => {
    promesas.push(
      Post_Image.create({
        url: img.url,
        PostId: post.id,
      })
    );
  });

  await Promise.all(promesas);

  const postConImagenes = await Post.findByPk(post.id, {
    include: { model: Post_Image, as: "Imagenes", attributes: ["id", "url"] },
  });

  res.status(201).json(postConImagenes);
};

const eliminarImagenes = async (req, res) => {
  const data = req.body;
  const post = await Post.findByPk(req.params.id);

  const promesas = [];
  data.imagenes.forEach((img) => {
    promesas.push(Post_Image.destroy({ where: { id: img.id, PostId: post.id } }));
  });

  await Promise.all(promesas);

  const postSinImagenes = await Post.findByPk(post.id, {
    include: { model: Post_Image, as: "Imagenes", attributes: ["id", "url"] },
  });

  res.status(200).json(postSinImagenes);
};

const eliminarPost = async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: [
      { model: Comment, as: "Comentarios" },
      { model: Post_Image, as: "Imagenes" },
      { model: Tag },
    ],
  });

  // Promesas para eliminar comentarios
  const promesasComentarios = [];
  post.Comentarios.forEach((comentario) => {
    promesasComentarios.push(Comment.destroy({ where: { id: comentario.id } }));
  });

  // Promesas para eliminar imágenes
  const promesasImagenes = [];
  post.Imagenes.forEach((imagen) => {
    promesasImagenes.push(Post_Image.destroy({ where: { id: imagen.id } }));
  });

  // Eliminar asociaciones con tags (sin borrar los tags)
  await post.setTags([]);

  // Ejecutar todas las eliminaciones de imágenes y comentarios
  await Promise.all([...promesasComentarios, ...promesasImagenes]);

  // Finalmente, eliminar el post
  await post.destroy();

  res.status(200).json({ message: "Post y elementos asociados eliminados correctamente" });
};

module.exports = { 
  findAll, 
  findByPk,
  findByPkVisibles,
  verDesdeFecha,
  crearPost, 
  agregarImagenes, 
  eliminarImagenes, 
  eliminarPost, 
   
  };
