const express = require("express");
const router = express.Router();
const {
  crearPostImage,
  obtenerImagenPorPost,
  eliminarPostImage,
} = require("../controllers/postImage.controller");

router.post("/", crearPostImage);

router.get("/:postId",  obtenerImagenPorPost);

router.delete("/:id", eliminarPostImage);

module.exports = router;
