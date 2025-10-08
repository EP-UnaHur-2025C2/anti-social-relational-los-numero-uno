const { Router } = require("express");
const commentController = require("../controllers/commentController");
const {validarText, validarComment} = require("../middlewares/validateComment");
const router = Router();

/*
Implementarlos luego
1. Obtener comentarios de un usuario en un post 
2. Obtener comentarios de un post
3. Obtener comentarios hechos por un usuario
*/

// 4. Crear un comentario en un post
router.post(
  "/create-comment/post/:postId",
  /*
  validarIdParams,
  validarUser,
  validarPost,
  */
  validarText,
  commentController.addCommentInPost
);

// 5. Modificar un comentario de un post
router.put(
  "/modify-comment/:commentId",
  /*
  validarIdParams,
  */
  validarComment,
  validarText,
  commentController.changeCommentInPost
);

// 6. Eliminar un comentario de un post
router.delete(
  "/user/:userId/post/:postId/comment/:commentId",
  /*
  validarIdParams,
  validarUser,
  validarPost,
  */
  validarComment,
  commentController.deleteCommentInPost
);

module.exports = router;
