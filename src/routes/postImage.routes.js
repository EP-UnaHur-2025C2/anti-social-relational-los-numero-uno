const express = require("express");
const router = express.Router();
const postImageController = require("../controllers/postImage.controller");
const { validarPostById } = require("../middlewares/validatePost");
const {
  validatePostImage,
  validarPostImageById,
  validarPostImageAssociation,
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

//1. añadir imagenes a un post
/**
 * @swagger
 * /postImages/add-images/post/{postId}:
 *   post:
 *     tags:
 *       - Post_Images
 *     summary: Crear una o varias imágenes en un post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         type: string
 *         description: ID del post al que se le agregan imágenes
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             images:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/PostImageInput'
 *     responses:
 *       '201':
 *         description: Imágenes creadas correctamente
 *         schema:
 *           $ref: '#/definitions/PostImagesArray'
 *       '400':
 *         description: Error de validación
 */
router.post(
  "/add-images/post/:postId",
  validarPostById,
  validatePostImage,
  postImageController.agregarImagenesAPost
);

//2. modificar imagen de un post
/**
 * @swagger
 * /postImages/post/{id}/image/{imageId}:
 *   put:
 *     tags:
 *       - Post_Images
 *     summary: Modificar una imagen de un post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID del post
 *       - in: path
 *         name: imageId
 *         required: true
 *         type: string
 *         description: ID de la imagen
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PostImageInput'
 *     responses:
 *       '200':
 *         description: Imagen modificada
 *         schema:
 *           $ref: '#/definitions/PostImage'
 *       '404':
 *         description: Post o imagen no encontrada
 */
router.put(
  "/post/:id/image/:imageId",
  validarPostById,
  validarPostImageById,
  validatePostImage,
  validarPostImageAssociation,
  postImageController.modificarPostImage
);

//3. eliminar imagen de un post
/**
 * @swagger
 * /postImages/post/{postId}/image/{imageId}:
 *   delete:
 *     tags:
 *       - Post_Images
 *     summary: Eliminar una imagen de un post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         type: string
 *       - in: path
 *         name: imageId
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Imagen eliminada correctamente
 *       '404':
 *         description: Post o imagen no encontrada
 */
router.delete(
  "/post/:postId/image/:imageId",
  validarPostById,
  validarPostImageById,
  postImageController.eliminarPostImage
);

//4. obtener todas las imagenes (de todos los posts)
/**
 * @swagger
 * /postImages/:
 *   get:
 *     tags:
 *       - Post_Images
 *     summary: Obtener todas las imágenes (de todos los posts)
 *     responses:
 *       '200':
 *         description: Lista de imágenes
 *         schema:
 *           $ref: '#/definitions/PostImagesArray'
 */
router.get("/", postImageController.obtenerImagenPorPost);

//5. obtener imagenes de un post especifico
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
 *         type: string
 *     responses:
 *       '200':
 *         description: Imágenes del post
 *         schema:
 *           $ref: '#/definitions/PostImagesArray'
 *       '404':
 *         description: Post no encontrado
 */
router.get("/post/:postId", postImageController.obtenerImagenPorPost);



module.exports = router;
