const { Router } = require("express");
const commentController = require("../controllers/comment.controller");
const {
  validarCreateCommentSchema,
  validarCommentById,
  validarUpdateCommentSchema,
  validarDate
} = require("../middlewares/validateComment");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - texto
 *         - userId
 *         - postId
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID del comentario
 *           example: 123
 *         texto:
 *           type: string
 *           description: El texto del comentario
 *           example: "Este es un comentario de ejemplo"
 *         userId:
 *           type: integer
 *           description: El ID del usuario que hizo el comentario
 *           example: 45
 *         postId:
 *           type: integer
 *           description: El ID del post al que pertenece el comentario
 *           example: 67
 *         fecha:
 *           type: string
 *           format: dateonly
 *           description: Fecha de creación del comentario
 *           example: "2024-06-01"
 *         visible:
 *           type: boolean
 *           description: Si el comentario es visible
 *           example: true
 */

// 1. Crear un comentario en un post
/**
 * @swagger
 * /comments/create-comment/post/{postId}/user/{userId}:
 *   post:
 *     summary: Crear un comentario en un post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - texto
 *             properties:
 *               texto:
 *                 type: string
 *                 description: El texto del comentario
 *                 example: "Me gusta este post"
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       atributo:
 *                         type: string
 *                       mensaje:
 *                         type: string
 *             examples:
 *               errorCampos:
 *                 value:
 *                   errors:
 *                     - atributo: "texto"
 *                       mensaje: "El texto es obligatorio"
 */
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
/**
 * @swagger
 * /comments/modify-comment/{commentId}:
 *   put:
 *     summary: Modificar un comentario
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario
 *     requestBody:
 *       required: true
 *       description: Se puede enviar el texto y/o la nueva fecha.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: El nuevo texto del comentario
 *                 example: "Comentario editado"
 *               fecha:
 *                 type: string
 *                 format: dateonly
 *                 description: La nueva fecha del comentario
 *                 example: "2024-06-10"
 *     responses:
 *       200:
 *         description: Comentario modificado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       atributo:
 *                         type: string
 *                       mensaje:
 *                         type: string
 *             examples:
 *               errorCampos:
 *                 value:
 *                   errors:
 *                     - atributo: "texto"
 *                       mensaje: "El texto no puede estar vacío"
 *                     - atributo: "fecha"
 *                       mensaje: "La fecha no es válida"
 *       404:
 *         description: Comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               errorId:
 *                 value:
 *                   message: "El comentario con id 123 no existe"
 */
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
/**
 * @swagger
 * /comments/delete-comment/{commentId}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario
 *     responses:
 *       204:
 *         description: Comentario eliminado exitosamente
 *       404:
 *         description: Comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               errorId:
 *                 value:
 *                   message: "El comentario con id 123 no existe"
 */
router.delete(
  "/delete-comment/:commentId",
  validarCommentById,
  commentController.deleteCommentInPost
);

// 4. Obtener todos los comentarios
/**
 * @swagger
 * /comments/:
 *   get:
 *     summary: Obtener todos los comentarios
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *             examples:
 *               comentarios:
 *                 value:
 *                   - id: 1
 *                     texto: "Comentario ejemplo"
 *                     userId: 45
 *                     postId: 67
 *                     fecha: "2024-06-01"
 *                     visible: true
 *                   - id: 2
 *                     texto: "Otro comentario"
 *                     userId: 46
 *                     postId: 67
 *                     fecha: "2024-06-02"
 *                     visible: false
 */
router.get("/", commentController.getComments);

/**
 * @swagger
 * /comments/visibles:
 *   get:
 *     summary: Obtener todos los comentarios visibles
 *     description: Solo devuelve los campos id, texto y createdAt de los comentarios visibles.
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Lista de comentarios visibles (solo id, texto y createdAt)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 123
 *                   texto:
 *                     type: string
 *                     example: "Comentario visible"
 *                   createdAt:
 *                     type: string
 *                     format: dateonly
 *                     example: "2024-06-01"
 *             examples:
 *               comentariosVisibles:
 *                 value:
 *                   - id: 1
 *                     texto: "Comentario visible"
 *                     createdAt: "2024-06-01"
 */
router.get("/visibles", commentController.getVisibleComments);

/**
 * @swagger
 * /comments/especific-date/{createdAt}:
 *   get:
 *     summary: Obtener comentarios por fecha específica
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: createdAt
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha específica (YYYY-MM-DD)
 *         example: "2024-06-01"
 *     responses:
 *       200:
 *         description: Lista de comentarios en la fecha dada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *             examples:
 *               comentariosFecha:
 *                 value:
 *                   - id: 1
 *                     texto: "Comentario en fecha"
 *                     userId: 45
 *                     postId: 67
 *                     fecha: "2024-06-01"
 *                     visible: true
 */
router.get(
  "/especific-date/:createdAt",
  validarDate,
  commentController.getCommentsInDate
);

/**
 * @swagger
 * /comments/{commentId}:
 *   get:
 *     summary: Obtener un comentario específico
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *             examples:
 *               comentario:
 *                 value:
 *                   id: 1
 *                   texto: "Comentario ejemplo"
 *                   userId: 45
 *                   postId: 67
 *                   fecha: "2024-06-01"
 *                   visible: true
 *       404:
 *         description: Comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               errorId:
 *                 value:
 *                   message: "El comentario con id 123 no existe"
 */
router.get(
  "/:commentId", 
  validarCommentById, 
  commentController.getCommentById
);

/**
 * @swagger
 * /comments/post/{postId}:
 *   get:
 *     summary: Obtener todos los comentarios de un post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Lista de comentarios del post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *             examples:
 *               comentariosPost:
 *                 value:
 *                   - id: 1
 *                     texto: "Comentario en post"
 *                     userId: 45
 *                     postId: 67
 *                     fecha: "2024-06-01"
 *                     visible: true
 *       404:
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               errorId:
 *                 value:
 *                   message: "El post con id 123 no existe"
 */
router.get(
  "/post/:postId",
  /*validarPostById,*/ 
  commentController.getCommentsInPostById
);

/**
 * @swagger
 * /comments/user/{userId}:
 *   get:
 *     summary: Obtener todos los comentarios de un usuario
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de comentarios del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *             examples:
 *               comentariosUsuario:
 *                 value:
 *                   - id: 1
 *                     texto: "Comentario de usuario"
 *                     userId: 45
 *                     postId: 67
 *                     fecha: "2024-06-01"
 *                     visible: true
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               errorId:
 *                 value:
 *                   message: "El usuario con id 123 no existe"
 */
router.get(
  "/user/:userId",
  /*validarUserById,*/ 
  commentController.getUserCommentsById
);

/**
 * @swagger
 * /comments/post/{postId}/user/{userId}:
 *   get:
 *     summary: Obtener todos los comentarios de un usuario en un post específico
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de comentarios del usuario en el post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *             examples:
 *               comentariosUsuarioPost:
 *                 value:
 *                   - id: 1
 *                     texto: "Comentario de usuario en post"
 *                     userId: 45
 *                     postId: 67
 *                     fecha: "2024-06-01"
 *                     visible: true
 *       404:
 *         description: Post o usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               errorId:
 *                 value:
 *                   message: "El post con id 123 no existe"
 */
router.get(
  "/post/:postId/user/:userId",
  /*
  validarPostById,
  validarUserById,
  */ 
  commentController.getUserCommentsInPostById
);

/**
 * @swagger
 * /comments/post/{postId}/count:
 *   get:
 *     summary: Obtener la cantidad de comentarios de un post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Cantidad de comentarios del post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Número de comentarios
 *             examples:
 *               cantidadComentarios:
 *                 value:
 *                   count: 2
 */
router.get(
  "/post/:postId",
  /*
  validarPostById,
  */ 
  commentController.getAmountCommentsInPostById
);

module.exports = router;
