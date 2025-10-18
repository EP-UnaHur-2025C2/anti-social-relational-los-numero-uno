const express = require("express");
const postTagController = require("../controllers/postTag.controller");
const {
  validatePostTagSchema,
  validarPostTagById
} = require("../middlewares/validatePostTag");
const router = express.Router();
const { validarPostById } = require("../middlewares/validatePost");
const { validarTagByid } = require("../middlewares/validateTags");

//1. Añadir una etiqueta a un post
router.post(
  "/associate-tag/post/:postId/tag/:tagId",
  validatePostTagSchema,
  validarPostById,
  postTagController.addTagToPost
);

//2. Eliminar una etiqueta de un post
router.delete(
  "/delete-association/post/:postId/tag/:tagId",
  validarPostById,
  validarTagByid,
  validarPostTagById,
  postTagController.removeTagFromPost
);

//3. Obtener todas las etiquetas asociadas a un post
router.get(
  "/post/:postId/tags",
  validarPostById,
  postTagController.getTagsInPostById
);

//4. Obtener todos los posts asociados a una etiqueta
router.get(
  "/tags/:tagId/posts",
  validarTagByid,
  postTagController.getPostsWithTagById
);

module.exports = router;
