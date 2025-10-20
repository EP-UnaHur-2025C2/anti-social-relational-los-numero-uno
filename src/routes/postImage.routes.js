const express = require("express");
const router = express.Router();
const postImageController = require("../controllers/postImage.controller");
const {
  validarPostById,
  validarUserAssociationById,
} = require("../middlewares/validatePost");
const { validarUserById } = require("../middlewares/validateUsuario");
const {
  validatePostImage,
  validarPostImageById,
  validarPostImageAssociation,
  validateAddImages,
} = require("../middlewares/validatePostImage");

/**
 * @swagger
 * components:
 *   schemas:
 *     Post_Image:
 *       type: object
 *       required:
 *         - url
 *       properties:
 *         id:
 *           description: ID único de la imagen del post
 *           type: integer
 *           example: 1
 *         url:
 *           description: URL de la imagen del post
 *           type: string
 *           format: uri
 *           example: "https://example.com/image.jpg"
 */

//1. agregar imagenes a un post VERIFICADO
/**
 * @swagger
 * /postImages/add-images/post/{postId}/user/{userId}:
 *   post:
 *     tags:
 *       - Post_Images
 *     summary: Agregar imágenes a un post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post en el cual se agregarán las imágenes
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario que realiza la acción
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       format: uri
 *                       description: URL de la imagen
 *                   required:
 *                     - url
 *             required:
 *               - images
 *           example:
 *             images:
 *               - url: "https://example.com/image1.jpg"
 *               - url: "https://example.com/image2.jpg"
 *     responses:
 *       201:
 *         description: Operación exitosa. 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     Post_Images:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post_Image'
 *             example:
 *               Post:
 *                 id: 1
 *                 Post_Images:
 *                   - id: 10
 *                     url: "https://example.com/image1.jpg"
 *                   - id: 11
 *                     url: "https://example.com/image2.jpg"
 *       400:
 *         description: Error de validación en alguna de las imágenes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   atributo:
 *                     type: string
 *                     format: uri
 *                   mensaje:
 *                     type: string
 *             example:
 *               - atributo: "images"
 *                 error: "Debe haber al menos una imagen"
 *       403:
 *         description: Usuario no asociado al post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "El usuario con id 2 no está asociado al post con id 3"
 *       404:
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             example:
 *               mensaje: "El post con id 1 no existe"
 */
router.post(
  "/add-images/post/:postId/user/:userId",
  validarPostById,
  validarUserById,
  validarUserAssociationById,
  validateAddImages,
  postImageController.agregarImagenesAPost
);

//2. modificar una imagen de un post VERIFICADO
/**
 * @swagger
 * /postImages/modify-image/post/{postId}/image/{imageId}/user/{userId}:
 *   put:
 *     tags:
 *       - Post_Images
 *     summary: Modificar la URL de una imagen de un post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post que contiene la imagen
 *         schema:
 *           type: integer
 *       - in: path
 *         name: imageId
 *         required: true
 *         description: ID de la imagen a modificar
 *         schema:
 *           type: integer
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario que realiza la modificación
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: Nueva URL de la imagen
 *             required:
 *               - url
 *           example:
 *             url: "https://example.com/new-image.jpg"
 *     responses:
 *       200:
 *         description: Imagen modificada correctamente. Devuelve la imagen actualizada y el id del post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 11
 *                 url:
 *                   type: string
 *                   format: uri
 *                   example: "https://example.com/new-image.jpg"
 *                 postId:
 *                   type: integer
 *                   example: 3
 *             example:
 *               id: 11
 *               url: "https://example.com/new-image.jpg"
 *               postId: 3
 *       400:
 *         description: Error de validación en la imagen.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   atributo:
 *                     type: string
 *                   mensaje:
 *                     type: string
 *             example:
 *               - atributo: "url"
 *                 mensaje: "Debe ser una URL válida"
 *       403:
 *         description: Usuario no asociado al post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "El usuario con id 2 no está asociado al post con id 3"
 *       404:
 *         description: Post o imagen no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             example:
 *               mensaje: "El post con id 4 no existe"
 */
router.put(
  "/modify-image/post/:postId/image/:imageId/user/:userId",
  validarPostById,
  validarPostImageById,
  validarUserById,
  validarUserAssociationById,
  validatePostImage,
  validarPostImageAssociation,
  postImageController.modificarPostImage
);

//3. eliminar una imagen de un post VERIFICADO
/**
 * @swagger
 * /postImages/post/{postId}/image/{imageId}/user/{userId}:
 *   delete:
 *     tags:
 *       - Post_Images
 *     summary: Eliminar una imagen de un post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post que contiene la imagen
 *         schema:
 *           type: integer
 *       - in: path
 *         name: imageId
 *         required: true
 *         description: ID de la imagen a eliminar
 *         schema:
 *           type: integer
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario que realiza la acción
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Imagen eliminada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Imagen eliminada correctamente"
 *       403:
 *         description: Usuario no asociado al post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "El usuario con id 2 no está asociado al post con id 3"
 *       404:
 *         description: Post o imagen no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             example:
 *               mensaje: "El post o la imagen no existen"
 */
router.delete(
  "/post/:postId/image/:imageId/user/:userId",
  validarPostById,
  validarUserById,
  validarPostImageById,
  validarUserAssociationById,
  postImageController.eliminarPostImage
);

//4. obtener todas las imagenes (de todos los posts) VERIFICADO
/**
 * @swagger
 * /postImages:
 *   get:
 *     tags:
 *       - Post_Images
 *     summary: Obtener todas las imágenes de todos los posts
 *     description: Devuelve una lista de objetos Post_Image con su post asociado (solo id del post).
 *     responses:
 *       200:
 *         description: Lista de imágenes con su post asociado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 10
 *                   url:
 *                     type: string
 *                     format: uri
 *                     example: "https://example.com/image1.jpg"
 *                   Post:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *             example:
 *               - id: 10
 *                 url: "https://example.com/image1.jpg"
 *                 Post:
 *                   id: 1
 *               - id: 11
 *                 url: "https://example.com/image2.jpg"
 *                 Post:
 *                   id: 2
 */
router.get("/", postImageController.obtenerTodasLasImagenes);

//5. obtener imágenes de un post específico VERIFICADO
/**
 * @swagger
 * /postImages/post/{postId}:
 *   get:
 *     tags:
 *       - Post_Images
 *     summary: Obtener imágenes de un post específico
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post cuyas imágenes se desean obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de imágenes pertenecientes al post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 10
 *                   url:
 *                     type: string
 *                     format: uri
 *                     example: "https://example.com/image1.jpg"
 *                   PostId:
 *                     type: integer
 *                     example: 1
 *             example:
 *               - id: 6
 *                 url: "https://example.com/image1.jpg"
 *                 PostId: 1
 *               - id: 7
 *                 url: "https://example.com/image2.jpg"
 *                 PostId: 1
 *       404:
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             example:
 *               mensaje: "El post con id 1 no existe"
 */
router.get("/post/:postId", postImageController.obtenerImagenPorPost);

module.exports = router;
