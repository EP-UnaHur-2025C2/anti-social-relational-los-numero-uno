const { Post, Comment, PostImg, Tag, Usuario } = require("../../db/models");

const crearPost = async (req, res) => {
  const data = req.body;

  // Crear el Post (ajusta campos según tu modelo)
  const post = await Post.create({
    texto: data.texto,
  });

  const userId = req.params.userId;
  const usuario = await Usuario.findByPk(userId);
  await usuario.addPost(post);

  const promesas = [];
  const imagenesData = data.PostImgs || [];
  const tagsData = data.Tags || [];

  // Asociar imagenes si las hay
  imagenesData.forEach((imagen) => {
    promesas.push(
      PostImg.create({ url: imagen.url }).then((postImage) => {
        return post.addPostImg(postImage);
      })
    );
  });

  // Asociar tags si los hay
  tagsData.forEach((t) => {
    promesas.push(
      Tag.findOrCreate({
        where: { Nombre: t.Nombre },
        defaults: t,
      }).then((tagInstance) => {
        const tag = tagInstance[0];
        return post.addTag(tag);
      })
    );
  });

  // Esperar a que todas las asociaciones (imágenes + tags) se completen
  await Promise.all(promesas);

  // Devolver el post con sus asociaciones básicas
  res.status(201).json({
    ...post.dataValues,
    PostImgs: await post.getPostImgs({ joinTableAttributes: [] }),
    Tags: await post.getTags({ joinTableAttributes: [] }),
  });
};

const updatePostById = async (req, res) => {
  const id = req.params.postId;
  const data = req.body;
  await Post.update(
    {
      texto: data.texto,
    },
    { where: { id } }
  );
  const updatedPost = await Post.findByPk(id);
  res.status(200).json({
    ...updatedPost.dataValues,
    PostImgs: await updatedPost.getPostImgs({ joinTableAttributes: [] }),
    Tags: await updatedPost.getTags({ joinTableAttributes: [] }),
  });
};

const eliminarPostById = async (req, res) => {
  const id = req.params.postId;
  await Post.destroy({ where: { id } });
  res.status(204).send();
};

const findAll = async (_, res) => {
  const data = await Post.findAll({
    include: [
      {
        model: PostImg,
        attributes: ["url"],
      },
      {
        model: Tag,
        attributes: ["id", "nombre"],
        through: { attributes: [] }, // Evita incluir la tabla de unión PostTag
      },
      {
        model: Comment,
        attributes: ["texto"],
        include: [
          {
            model: Usuario,
            attributes: ["nickName"],
          },
        ],
      },
    ],
  });

  const comentarios = data.comments;
  if (comentarios) {
    const comentariosVisibles = data.comments.filter((c) => c.visible);
    data.dataValues.comments = comentariosVisibles;
  }
  res.status(200).json(data);
};

const findByPk = async (req, res) => {
  const id = req.params.postId;
  const data = await Post.findByPk(id, {
    include: [
      {
        model: PostImg,
        attributes: ["url"],
      },
      {
        model: Tag,
        attributes: ["id", "nombre"],
        through: { attributes: [] }, // Evita incluir la tabla de unión PostTag
      },
      {
        model: Comment,
        attributes: ["texto"],
        include: [
          {
            model: Usuario,
            attributes: ["nickName"],
          },
        ],
      },
    ],
  });

  const comentarios = data.comments;
  if (comentarios) {
    const comentariosVisibles = data.comments.filter((c) => c.visible);
    data.dataValues.comments = comentariosVisibles;
  }

  res.status(200).json(data);
};

const findByPkAllComments = async (req, res) => {
  const id = req.params.postId;
  const data = await Post.findByPk(id, {
    include: [
      {
        model: PostImg,
        attributes: ["url"],
      },
      {
        model: Tag,
        attributes: ["id", "nombre"],
        through: { attributes: [] }, // Evita incluir la tabla de unión PostTag
      },
      {
        model: Comment,
        attributes: ["texto"],
        include: [
          {
            model: Usuario,
            attributes: ["nickName"],
          },
        ],
      },
    ],
  });
  res.status(200).json(data);
};

module.exports = {
  findAll,
  findByPk,
  findByPkAllComments,
  crearPost,
  eliminarPostById,
  updatePostById,
};
