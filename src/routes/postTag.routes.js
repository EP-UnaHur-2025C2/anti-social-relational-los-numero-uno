const express = require("express");
const postTagController = require("../controllers/postTag.controller");
const {
  validateTagAssociationSchema,
  validarPostTagById
} = require("../middlewares/validatePostTag");
const router = express.Router();
const { validarPostById, validarUserAssociationById } = require("../middlewares/validatePost");
const {validarUserById } = require("../middlewares/validateUsuario");
const { validarTagByid } = require("../middlewares/validateTags");

/**
 * @swagger
 * components:
 *   schemas:
 *     PostTag:
 *       type: object
 *       properties:
 *         PostId:
 *           description: ID del post
 *           type: integer
 *           example: 1
 *         TagId:
 *           description: ID del tag
 *           type: integer
 *           example: 2
 *       required:
 *         - PostId
 *         - TagId
 */

// 1. Añadir una etiqueta(s) a un post VERIFICADO
/**
 * @swagger
 * /postTags/associate-tags/post/{postId}/user/{userId}:
 *   post:
 *     tags:
 *       - PostTags
 *     summary: Asociar varias etiquetas a un post
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID del post
 *         required: true
 *         schema:
 *           type: integer
 *       - name: userId
 *         in: path
 *         description: ID del usuario que realiza la acción
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Tags:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Nombre:
 *                       type: string
 *                       example: "javascript"
 *                   required:
 *                     - Nombre
 *             required:
 *               - Tags
 *     responses:
 *       '201':
 *         description: Asociación creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: integer
 *                   example: 1
 *                 Tags:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       Nombre:
 *                         type: string
 *                         example: "EtiquetaEjemplo"
 *       '403':
 *         description: Usuario no asociado al post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "El usuario con id 2 no está asociado al post con id 5"
 *       '404':
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El post con id 5 no existe"
 */
router.post(
  "/associate-tags/post/:postId/user/:userId",
  validateTagAssociationSchema,
  validarPostById,
  validarUserById,
  validarUserAssociationById,
  postTagController.addTagToPost
);

// 2. Eliminar una etiqueta de un post VERIFICADO
/**
 * @swagger
 * /postTags/delete-association/post/{postId}/tag/{tagId}/user/{userId}:
 *   delete:
 *     tags:
 *       - PostTags
 *     summary: Eliminar una etiqueta de un post
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID del post
 *         required: true
 *         schema:
 *           type: integer
 *       - name: tagId
 *         in: path
 *         description: ID de la etiqueta
 *         required: true
 *         schema:
 *           type: integer
 *       - name: userId
 *         in: path
 *         description: ID del usuario que realiza la acción
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Asociación eliminada correctamente
 *       '403':
 *         description: Usuario no asociado al post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "El usuario con id 2 no está asociado al post con id 5"
 *       '404':
 *         description: Asociación/Post/Tag no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El tag con id 3 no está asociado al post con id 1
 */
router.delete(
  "/delete-association/post/:postId/tag/:tagId/user/:userId",
  validarPostById,
  validarTagByid,
  validarUserById,
  validarUserAssociationById,
  validarPostTagById,
  postTagController.removeTagFromPost
);

// 3. Obtener todas las etiquetas asociadas a un post VERIFICADO
/**
 * @swagger
 * /postTags/post/{postId}/tags:
 *   get:
 *     tags:
 *       - PostTags
 *     summary: Obtener todas las asociaciones post-tag para un post
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID del post
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Lista de tags asociadas al post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Tag:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       Nombre:
 *                         type: string
 *                         example: "EtiquetaEjemplo"
 *       '404':
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El post con id 5 no existe
 */
router.get(
  "/post/:postId/tags",
  validarPostById,
  postTagController.getTagsInPostById
);

// 4. Obtener todos los posts asociados a una etiqueta VERIFICADO
/**
 * @swagger
 * /postTags/tag/{tagId}/posts:
 *   get:
 *     tags:
 *       - PostTags
 *     summary: Obtener todas las asociaciones post-tag para una etiqueta
 *     parameters:
 *       - name: tagId
 *         in: path
 *         description: ID de la etiqueta
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Lista de posts asociados a la etiqueta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Post:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       texto:
 *                         type: string
 *                         example: "Este es un ejemplo de contenido para un post."
 *       '404':
 *         description: Tag no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El tag con id 3 no existe
 */
router.get(
  "/tag/:tagId/posts",
  validarTagByid,
  postTagController.getPostsWithTagById
);

module.exports = router;
