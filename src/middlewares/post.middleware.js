const { Post } = require("../db/models");

const validarBodyPost = (req, res, next) => {
  const {descripcion} = req.body;
  if (!descripcion) {
    return res.status(400).json({ message: "La descripción es obligatoria" });
  }
  next();
};


module.exports = {
  validarBodyPost, 
};