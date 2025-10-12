const { Router } = require("express");
const commentController = require("../controllers/commentController");
const {
  validarCreateCommentSchema,
  validarCommentById,
  validarUpdateCommentSchema,
} = require("../middlewares/validateComment");
const router = Router();

// 4. Crear un comentario en un post
router.post(
  "/create-comment/post/:postId/user/:userId",
  /*
  validarUserById,
  validarPostById,
  */
  validarCreateCommentSchema,
  commentController.addCommentInPost
);

// 5. Modificar un comentario de un post
router.put(
  "/modify-comment/:commentId",
  /*
  validarIdParams,
  */
  validarCommentById,
  validarUpdateCommentSchema,
  commentController.changeCommentInPost
);

// 6. Eliminar un comentario de un post
router.delete(
  "/delete-comment/:commentId",
  validarCommentById,
  commentController.deleteCommentInPost
);

// 6. Obtener todos los comentarios
router.get("/", commentController.getComments);

//7. Obtener todos los comentarios visibles
router.get("/visibles", commentController.getVisibleComments);

//8. Obtener comentario especifico
router.get("/:commentId", validarCommentById, commentController.getCommentById);
module.exports = router;
