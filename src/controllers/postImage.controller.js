const { Post_Image } = require("../../db/models");

const crearPostImage = async (req, res) => {
  try {
    const { PostID, URL } = req.body;

    if (!PostID || !URL) {
      return res.status(400).json({ message: "PostID y URL son obligatorios" });
    }

    const newImage = await Post_Image.create({ PostID, URL });
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const obtenerImagenPorPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const images = await Post_Image.findAll({ where: { PostID: postId } });

    if (!images.length) {
      return res
        .status(404)
        .json({ message: "No hay imágenes para este post" });
    }

    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const eliminarPostImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post_Image.destroy({ where: { ID: id } });

    if (!deleted) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearPostImage,
  obtenerImagenPorPost,
  eliminarPostImage,
};
