const { Router } = require("express");
const commentController = require("../controllers/commentController");
const {
  validarCreateCommentSchema,
  validarCommentById,
  validarUpdateCommentSchema,
  validarDate
} = require("../middlewares/validateComment");
const router = Router();

// 1. Crear un comentario en un post
router.post(
  "/create-comment/post/:postId/user/:userId",
  /*
  validarUserById,
  validarPostById,
  */
  validarCreateCommentSchema,
  commentController.addCommentInPost
);

// 2. Modificar un comentario de un post
router.put(
  "/modify-comment/:commentId",
  /*
  validarIdParams,
  */
  validarCommentById,
  validarUpdateCommentSchema,
  commentController.changeCommentInPost
);

// 3. Eliminar un comentario de un post
router.delete(
  "/delete-comment/:commentId",
  validarCommentById,
  commentController.deleteCommentInPost
);

// 4. Obtener todos los comentarios
router.get("/", commentController.getComments);

// 5. Obtener todos los comentarios visibles
router.get("/visibles", commentController.getVisibleComments);

// 6. obtener todos los comentarios en una fecha especifica
router.get(
  "/especific-date/",
  validarDate,
  commentController.getCommentsInDate
);

// 7. Obtener comentario especifico
router.get(
  "/:commentId", 
  validarCommentById, 
  commentController.getCommentById
);

// 8. obtener todos los comentarios de un post
router.get(
  "/post/:postId",
  /*validarPostById,*/ 
  commentController.getCommentsInPostById
);

// 9. obtener todos los comentarios de un usuario
router.get(
  "/user/:userId",
  /*validarUserById,*/ 
  commentController.getUserCommentsById
);

// 10. obtener todos los comentarios de un usuario en un post especifico
router.get(
  "/post/:postId/user/:userId",
  /*
  validarPostById,
  validarUserById,
  */ 
  commentController.getUserCommentsInPostById
);

// 11. obtener la cantidad de comentarios de un post
router.get(
  "/post/:postId",
  /*
  validarPostById,
  */ 
  commentController.getAmountCommentsInPostById
);
module.exports = router;
