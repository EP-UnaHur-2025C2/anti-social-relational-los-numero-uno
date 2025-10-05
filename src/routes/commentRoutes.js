const { Router } = require("express");
const commentController = require("../controllers/commentController");
const {validarText, validarComment} = require("../middlewares/validateComment");
const router = Router();

// 1. Obtener comentarios de un usuario en un post 
router.get(
  "/user/:userId/post/:postId/",
  validarIdParams,
  validarUser,
  validarPost,
  commentController.getCommentsByUserInPost
);

// 2. Obtener comentarios de un post
router.get(
  "/post/:postId/",
  validarIdParams,
  validarPost,
  commentController.getCommentsInPost
);

// 3. Obtener comentarios hechos por un usuario
router.get(
  "/user/:userId/",
  validarIdParams,
  validarUser,
  commentController.getCommentsById
);

// 4. Crear un comentario en un post
router.post(
  "/user/:userId/post/:postId",
  validarIdParams,
  validarUser,
  validarPost,
  validarText,
  commentController.addCommentInPost
);

// 5. Modificar un comentario de un post
router.put(
  "/user/:userId/post/:postId/comment/:commentId",
  validarIdParams,
  validarUser,
  validarPost,
  validarComment,
  validarText,
  commentController.changeCommentInPost
);

// 6. Eliminar un comentario de un post
router.delete(
  "/user/:userId/post/:postId/comment/:commentId",
  validarIdParams,
  validarUser,
  validarPost,
  validarComment,
  commentController.deleteCommentInPost
);

module.exports = router;
