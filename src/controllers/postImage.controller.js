const { Post_Image, Post } = require("../../db/models");

const agregarImagenesAPost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByPk(postId);

  const imagenesData = req.body.images;

  for (const imagen of imagenesData) {
    const postImage = await Post_Image.create({ url: imagen.url });
    await post.addPost_Image(postImage);
  }

  res.status(201).json({
    Post: await Post.findByPk(postId, {
      attributes: ["id"],
      include: [{ model: Post_Image, attributes: ["url"] }],
    })
  });
};

const modificarPostImage = async (req, res) => {
  const { imageId } = req.params;
  const postImage = await Post_Image.findByPk(imageId);
  await postImage.update(req.body);
  res.status(200).json(postImage);
};

const obtenerTodasLasImagenes = async (_, res) => {
  const postImages = await Post_Image.findAll({
    attributes: ["id", "url"],
    include: [{ model: Post, attributes: ["id"] }]
  });
  res.status(200).json(postImages);
};

const obtenerImagenPorPost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post_Image.findAll({ where: { PostID: postId } });
  res.status(200).json(post);
};

const eliminarPostImage = async (req, res) => {
  const { imageId } = req.params;
  const postImage = await Post_Image.findByPk(imageId);
  await postImage.destroy();
  res.status(204).send();
};

module.exports = {
  agregarImagenesAPost,
  obtenerImagenPorPost,
  eliminarPostImage,
  modificarPostImage,
  obtenerTodasLasImagenes,
};
