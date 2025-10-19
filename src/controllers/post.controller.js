const { Post, Comment, PostImg, Tag, Usuario } = require("../../db/models");

const crearPost = async (req, res) => {
  const data = req.body;
  const userId = req.params.userId;

  const post = await Post.create({
    texto: data.texto,
    UsuarioId: userId,
  });

  const tagsData = data.Tags || [];

  if (tagsData.length > 0) {
    for (const t of tagsData) {
      const [tag] = await Tag.findOrCreate({
        where: { Nombre: t.Nombre },
        defaults: t,
      });
      await post.addTag(tag);
    }
  }

  const imagenesData = data.PostImgs || [];
  if (imagenesData.length > 0) {
    for (const imagen of imagenesData) {
      const postImage = await PostImg.create({ url: imagen.url });
      await post.addPostImg(postImage);
    }
  }

  const postCompleto = await Post.findByPk(post.id, {
    include: [
      { model: PostImg, attributes: ["url"] },
      { model: Tag, through: { attributes: [] } },
    ],
  });

  res.status(201).json(postCompleto);

  res.status(201).json(postCompleto);
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
  res.status(200).json(updatedPost);
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
