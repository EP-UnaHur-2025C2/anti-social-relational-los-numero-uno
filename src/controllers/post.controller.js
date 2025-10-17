const { Post, Comment, PostImg, Tag, Usuario } = require("../../db/models");

const crearPost = async (req, res) => {
  const data = req.body;

  // Crear el Post (ajusta campos según tu modelo)
  const post = await Post.create({
    texto: data.texto,
  });

  const promesas = [];
  const imagenesData = data.imagenes || [];
  const tagsData = data.tags || [];

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
        where: { nombre: t.nombre },
        defaults: { nombre: t.nombre },
      }).then((tagInstance) => {
        const tag = tagInstance[0];
        return post.addTag(tag);
      })
    );
  });

  // Esperar a que todas las asociaciones (imágenes + tags) se completen
  await Promise.all(promesas);

  const userId = req.params.userId;
  const usuario = await Usuario.findByPk(userId);
  await usuario.addPost(post);

  // Devolver el post con sus asociaciones básicas
  res.status(201).json({
    ...post.dataValues,
    imagenes: await post.getPostImgs({ joinTableAttributes: [] }),
    tags: await post.getTags({ joinTableAttributes: [] }),
  });
};

const updatePost = async (req, res) => {
  
}

const eliminarPost = async (req, res) => {
  const id = req.params.postId;
  await Post.destroy({ where: { id } });
  res.status(204).send();
};

const findAll = async (_, res) => {
  const data = await Post.findAll({
    include: [
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
      {
        model: PostImg,
        attributes: ["url"],
      },
      {
        model: Tag,
        attributes: ["nombre"],
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
        model: Comment,
        attributes: ["texto"],
        include: [
          {
            model: Usuario,
            attributes: ["nickName"], 
          },
        ],
      },
      {
        model: PostImg,
        attributes: ["url"],
      },
      {
        model: Tag,
        attributes: ["nombre"],
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
        model: Comment,
        attributes: ["texto"],
        include: [
          {
            model: Usuario,
            attributes: ["nickName"], 
          },
        ],
      },
      {
        model: PostImg,
        attributes: ["url"],
      },
      {
        model: Tag,
        attributes: ["nombre"],
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
  eliminarPost,
};
