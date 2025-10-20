const { Router } = require("express");
const commentController = require("../controllers/comment.controller");
const {
  validarCreateCommentSchema,
  validarCommentById,
  validarUpdateCommentSchema,
  validarDate,
} = require("../middlewares/validateComment");
const { validarUserById } = require("../middlewares/validateUsuario");
const { validarPostById } = require("../middlewares/validatePost");


const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - texto
 *         - UsuarioId
 *         - PostId
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID del comentario
 *           example: 123
 *         texto:
 *           type: string
 *           description: El texto del comentario
 *           example: "Este es un comentario de ejemplo"
 *         UsuarioId:
 *           type: integer
 *           description: El ID del usuario que hizo el comentario
 *           example: 45
 *         PostId:
 *           type: integer
 *           description: El ID del post al que pertenece el comentario
 *           example: 67
 *         createdAt:
 *           type: string
 *           format: dateonly
 *           description: Fecha de creación del comentario
 *           example: "2025-10-17"
 *         visible:
 *           type: boolean
 *           description: Si el comentario es visible
 *           example: true
 */

//1. Crear un comentario en un post VERIFICADO
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
 *         description: Comentario creado (ejemplo)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *             example:
 *               id: 8
 *               texto: "Me gusta este post"
 *               createdAt: "2025-10-17"
 *               usuario:
 *                 id: 1
 *                 nickName: "lautaro123"
 *                 mail: "lautaro@gmail.com"
 *               post:
 *                 id: 23
 *                 texto: "Este es un ejemplo de contenido para un post."
 *                 UsuarioId: 1
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
 *                   message: "El post con id 23 no existe"
 */
router.post(
  "/create-comment/post/:postId/user/:userId",
  validarUserById,
  validarPostById,
  validarCreateCommentSchema,
  commentController.addCommentInPost
);

// 2. Modificar un comentario de un post VERIFICADO
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
 *               createdAt:
 *                 type: string
 *                 format: dateonly
 *                 description: La nueva fecha del comentario
 *                 example: "2024-06-10"
 *     responses:
 *       200:
 *         description: Comentario modificado exitosamente (solo id, texto y createdAt)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 8
 *                 texto:
 *                   type: string
 *                   example: "Comentario editado"
 *                 createdAt:
 *                   type: string
 *                   format: dateonly
 *                   example: "2025-10-17"
 *             example:
 *               id: 8
 *               texto: "Comentario editado"
 *               createdAt: "2025-10-17"
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
 *                     - atributo: "createdAt"
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
  validarCommentById,
  validarUpdateCommentSchema,
  commentController.changeCommentInPost
);

// 3. Eliminar un comentario de un post VERIFICADO
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

// 4. Obtener todos los comentarios VERIFICADO
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 8
 *                   texto:
 *                     type: string
 *                     example: "Me gusta este post"
 *                   userId:
 *                     type: integer
 *                     example: 1
 *                   postId:
 *                     type: integer
 *                     example: 23
 *                   createdAt:
 *                     type: string
 *                     format: dateonly
 *                     example: "2025-10-17"
 *                   visible:
 *                     type: boolean
 *                     example: true
 *             example:
 *               - id: 8
 *                 texto: "Me gusta este post"
 *                 userId: 1
 *                 postId: 23
 *                 createdAt: "2025-10-17"
 *                 visible: true
 *               - id: 9
 *                 texto: "Otro comentario de ejemplo"
 *                 userId: 2
 *                 postId: 23
 *                 createdAt: "2025-10-16"
 *                 visible: false
 */
router.get("/", commentController.getComments);

//5. Obtener todos los comentarios visibles VERIFICADO
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

// 6. Obtener un comentarios en una fecha especifica VERIFICADO
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 8
 *                   texto:
 *                     type: string
 *                     example: "Me gusta este post"
 *                   userId:
 *                     type: integer
 *                     example: 1
 *                   postId:
 *                     type: integer
 *                     example: 23
 *                   createdAt:
 *                     type: string
 *                     format: dateonly
 *                     example: "2025-10-17"
 *                   visible:
 *                     type: boolean
 *                     example: true
 *             example:
 *               - id: 8
 *                 texto: "Me gusta este post"
 *                 userId: 1
 *                 postId: 23
 *                 createdAt: "2025-10-17"
 *                 visible: true
 *               - id: 9
 *                 texto: "Otro comentario de ejemplo"
 *                 userId: 2
 *                 postId: 23
 *                 createdAt: "2025-10-16"
 *                 visible: false
 */
router.get(
  "/especific-date/:createdAt",
  validarDate,
  commentController.getCommentsInDate
);

//7. Obtener un comentario específico VERIFICADO
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
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 8
 *                 texto:
 *                   type: string
 *                   example: "Me gusta este post"
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 postId:
 *                   type: integer
 *                   example: 23
 *                 createdAt:
 *                   type: string
 *                   format: dateonly
 *                   example: "2025-10-17"
 *                 visible:
 *                   type: boolean
 *                   example: true
 *             example:
 *               id: 8
 *               texto: "Me gusta este post"
 *               userId: 1
 *               postId: 23
 *               createdAt: "2025-10-17"
 *               visible: true
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

//8. Obtener todos los comentarios de un post VERIFICADO
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 8
 *                   texto:
 *                     type: string
 *                     example: "Me gusta este post"
 *                   userId:
 *                     type: integer
 *                     example: 1
 *                   postId:
 *                     type: integer
 *                     example: 23
 *                   createdAt:
 *                     type: string
 *                     format: dateonly
 *                     example: "2025-10-17"
 *                   visible:
 *                     type: boolean
 *                     example: true
 *             example:
 *               - id: 8
 *                 texto: "Me gusta este post"
 *                 userId: 1
 *                 postId: 23
 *                 createdAt: "2025-10-17"
 *                 visible: true
 *               - id: 9
 *                 texto: "Otro comentario de ejemplo"
 *                 userId: 2
 *                 postId: 23
 *                 createdAt: "2025-10-16"
 *                 visible: false
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
 *               errorPost:
 *                 value:
 *                   message: "El post con id 23 no existe"
 */
router.get(
  "/post/:postId",
  validarPostById,
  commentController.getCommentsInPostById
);

//9. Obtener todos los comentarios de un usuario VERIFICADO
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 8
 *                   texto:
 *                     type: string
 *                     example: "Me gusta este post"
 *                   userId:
 *                     type: integer
 *                     example: 1
 *                   postId:
 *                     type: integer
 *                     example: 23
 *                   createdAt:
 *                     type: string
 *                     format: dateonly
 *                     example: "2025-10-17"
 *                   visible:
 *                     type: boolean
 *                     example: true
 *             example:
 *               - id: 8
 *                 texto: "Me gusta este post"
 *                 userId: 1
 *                 postId: 23
 *                 createdAt: "2025-10-17"
 *                 visible: true
 *               - id: 9
 *                 texto: "Otro comentario de ejemplo"
 *                 userId: 2
 *                 postId: 24
 *                 createdAt: "2025-10-16"
 *                 visible: false
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
 *               errorUsuario:
 *                 value:
 *                   message: "El usuario con id 1 no existe"
 */
router.get(
  "/user/:userId",
  validarUserById,
  commentController.getUserCommentsById
);

//10. Obtener todos los comentarios de un usuario en un post específico VERIFICADO
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
 *                 type: object
 *                 properties:
 *                   visible:
 *                     type: boolean
 *                     example: true
 *                   id:
 *                     type: integer
 *                     example: 5
 *                   texto:
 *                     type: string
 *                     example: "Me gusta este post"
 *                   createdAt:
 *                     type: string
 *                     format: dateonly
 *                     example: "2025-10-17"
 *                   UsuarioId:
 *                     type: integer
 *                     example: 1
 *                   PostId:
 *                     type: integer
 *                     example: 24
 *             examples:
 *               comentariosUsuarioPost:
 *                 value:
 *                   - visible: false
 *                     id: 4
 *                     texto: "Comentario editado"
 *                     createdAt: "2024-06-10"
 *                     UsuarioId: 1
 *                     PostId: 24
 *                   - visible: true
 *                     id: 5
 *                     texto: "Me gusta este post"
 *                     createdAt: "2025-10-17"
 *                     UsuarioId: 1
 *                     PostId: 24
 *                   - visible: true
 *                     id: 6
 *                     texto: "Me gusta este post"
 *                     createdAt: "2025-10-17"
 *                     UsuarioId: 1
 *                     PostId: 24
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
 *               errorPostUsuario:
 *                 value:
 *                   message: "El post con id 24 no existe"
 */
router.get(
  "/post/:postId/user/:userId",
  validarPostById,
  validarUserById,
  commentController.getUserCommentsInPostById
);

//11. Obtener la cantidad de comentarios de un post VERIFICADO
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
 *                 cantidadComentarios:
 *                   type: integer
 *                   description: Número de comentarios
 *             examples:
 *               cantidadComentarios:
 *                 value:
 *                   cantidadComentarios: 2
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
 *               errorPostCount:
 *                 value:
 *                   message: "El post con id 24 no existe"
 */
router.get(
  "/post/:postId/count",
  validarPostById,
  commentController.getAmountCommentsInPostById
);

module.exports = router;
