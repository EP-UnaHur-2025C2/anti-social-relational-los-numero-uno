const { Post_Image, Post } = require("../../db/models");

const agregarImagenesAPost = async (req, res) => {
  const { postId } = req.params;

  const imagenesData = req.body.images;

  for (const imagen of imagenesData) {
    await Post_Image.create({
      url: imagen.url,
      PostId: postId,
    });
  }

  const post = await Post.findById(postId)
    .select("id")
    .populate({ path: "imagenes", select: "url" });

  res.status(201).json({ Post: post });

};

const modificarPostImage = async (req, res) => {
 const { imageId } = req.params;
  await Post_Image.updateOne({ _id: imageId }, req.body);
  const postImageUpdated = await Post_Image.findById(imageId).select("_id url PostId");
  res.status(200).json(postImageUpdated);
};

const obtenerTodasLasImagenes = async (_, res) => {
  const postImages = await Post_Image.find()
    .select("id url")
    .populate("PostId", "id");
  res.status(200).json(postImages);
};

const obtenerImagenPorPost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post_Image.find({ PostId: postId });
  res.status(200).json(post);
};

const eliminarPostImage = async (req, res) => {
  const { imageId } = req.params;
  await Post_Image.deleteOne({ _id: imageId });
  res.status(204).send();
};

module.exports = {
  agregarImagenesAPost,
  obtenerImagenPorPost,
  eliminarPostImage,
  modificarPostImage,
  obtenerTodasLasImagenes,
};
