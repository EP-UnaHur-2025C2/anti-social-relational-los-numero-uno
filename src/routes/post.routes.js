const { Router } = require("express");
const {
  findAll,
  findByPk,
  crearPost,
  eliminarPostById,
  updatePostById,
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
 *         tags:
 *           type: array
 *           description: Lista de etiquetas asociadas al post
 *           items:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *                 description: Nombre de la etiqueta
 *                 example: "EtiquetaEjemplo"
 *       required:
 *         - texto
 */

//1. Crear un post VERIFICADO
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   atributo:
 *                     type: string
 *                     description: Atributo que causó el error
 *                   mensaje:
 *                     type: string
 *                     description: Descripción del error
 *                     example: "El campo 'texto' es obligatorio."
 */
route.post("/create-post/user/:userId", validarUserById, validarPost, crearPost);

//2. Modificar un post VERIFICADO
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
 *           example:
 *             texto: "Nuevo contenido del post"
 *     responses:
 *       200:
 *         description: Post modificado exitosamente
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   atributo:
 *                     type: string
 *                     description: Atributo que causó el error
 *                   mensaje:
 *                     type: string
 *                     description: Descripción del error
 *                     example: "El campo 'texto' no puede estar vacío."
 *     description: Solo se permite modificar el campo 'texto'. No se pueden modificar imágenes ni etiquetas (tags).
 */
route.put("/modify-post/:postId", validarPostById, validarPost, updatePostById);

//3. eliminar un post VERIFICADO
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
 *       400:
 *         description: Error de validación o post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "El post con id 4 no existe."
 */
route.delete("/delete-post/:postId", validarPostById, eliminarPostById);

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
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   atributo:
 *                     type: string
 *                     description: Atributo que causó el error
 *                   mensaje:
 *                     type: string
 *                     description: Descripción del error
 *                     example: "Error al procesar la solicitud."
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
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   atributo:
 *                     type: string
 *                     description: Atributo que causó el error
 *                   mensaje:
 *                     type: string
 *                     description: Descripción del error
 *                     example: "El ID del post debe ser un número válido."
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
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   atributo:
 *                     type: string
 *                     description: Atributo que causó el error
 *                   mensaje:
 *                     type: string
 *                     description: Descripción del error
 *                     example: "El ID del post no es válido."
 *       404:
 *         description: Post no encontrado
 */
route.get("/:postId/all-comments", validarPostById, findByPkAllComments);

module.exports = route;
