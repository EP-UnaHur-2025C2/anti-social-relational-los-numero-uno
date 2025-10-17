const { Router } = require("express");
const {
  findAll,
  findByPk,
  crearPost,
  eliminarPost,
  findByPkAllComments
} = require("../controllers/post.controller");

const {validarUserById} = require("../middlewares/validateUsuario");

const { validarPost, validarPostById } = require("../middlewares/validatePost");

const route = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         texto:
 *           type: string
 *           description: Contenido del post
 *           example: "Este es un ejemplo de contenido para un post."
 *       required:
 *         - texto
 */

//1. Crear un post
/**
 * @swagger
 * /posts/create-post/user/{userId}:
 *   post:
 *     summary: Crear un nuevo post para un usuario
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario que crea el post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post creado exitosamente
 *       400:
 *         description: Error de validación
 */
route.post("/create-post/user/:userId", validarUserById, validarPost, crearPost);

//2. Modificar un post
/**
 * @swagger
 * /posts/modify-post/{postId}:
 *   put:
 *     summary: Modificar un post existente
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post modificado exitosamente
 *       404:
 *         description: Post no encontrado
 */
route.put("/modify-post/:postId", validarPostById);

//3. eliminar un post
/**
 * @swagger
 * /posts/delete-post/{postId}:
 *   delete:
 *     summary: Eliminar un post existente
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post a eliminar
 *     responses:
 *       204:
 *         description: Post eliminado exitosamente
 *       404:
 *         description: Post no encontrado
 */
route.delete("/delete-post/:postId", validarPostById, eliminarPost);

//4. Obtener todos los posts VERIFICADO
/**
 * @swagger
 * /posts/:
 *   get:
 *     summary: Obtener todos los posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Lista de posts
 */
route.get("/", findAll);

//5. Obtener un post por su ID VERIFICADO
/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Obtener un post por su ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post a obtener
 *     responses:
 *       200:
 *         description: Detalle de un post
 *       404:
 *         description: Post no encontrado
 */
route.get("/:postId", validarPostById, findByPk);

//6. Obtener un post por su ID con todos los comentarios VERIFICADO
/**
 * @swagger
 * /posts/{postId}/all-comments:
 *   get:
 *     summary: Obtener un post por su ID con todos los comentarios
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post a obtener
 *     responses:
 *       200:
 *         description: Detalle de un post con todos los comentarios
 *       404:
 *         description: Post no encontrado
 */
route.get("/:postId/all-comments", validarPostById, findByPkAllComments);

module.exports = route;
