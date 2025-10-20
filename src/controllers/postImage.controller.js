const { Post_Image } = require("../../db/models");

const agregarImagenesAPost = async (req, res) => {
  const { postId } = req.params;
  const postImage = await Post_Image.create({
    ...req.body,
    PostID: postId,
  });
  res.status(201).json(postImage);
};

const modificarPostImage = async (req, res) => {
  const { imageId } = req.params;
  const postImage = await Post_Image.findByPk(imageId);
  await postImage.update(req.body);
  res.status(200).json(postImage);
}

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
};
