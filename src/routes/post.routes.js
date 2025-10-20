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
 *         id:
 *           type: integer
 *           description: ID único del post
 *           example: 24
 *         texto:
 *           type: string
 *           description: Contenido del post
 *           example: "Este es un ejemplo de contenido para un post."
 *         UsuarioId:
 *           type: integer
 *           description: ID del usuario que creó el post
 *           example: 5
 *       required:
 *         - texto
 *         - UsuarioId
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
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: Contenido del post
 *                 example: "Este es un ejemplo de contenido para un post."
 *               Tags:
 *                 type: array
 *                 description: Lista de etiquetas asociadas al post
 *                 items:
 *                   type: object
 *                   properties:
 *                     Nombre:
 *                       type: string
 *                       description: Nombre de la etiqueta
 *                       example: "EtiquetaEjemplo"
 *     responses:
 *       201:
 *         description: Post creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del post
 *                   example: 31
 *                 texto:
 *                   type: string
 *                   description: Contenido del post
 *                   example: "Este es un ejemplo de contenido para un post."
 *                 PostImgs:
 *                   type: array
 *                   description: Lista de imágenes asociadas al post
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         description: URL de la imagen
 *                         example: "https://example.com/image.jpg"
 *                 Tags:
 *                   type: array
 *                   description: Lista de etiquetas asociadas al post
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID único de la etiqueta
 *                         example: 3
 *                       Nombre:
 *                         type: string
 *                         description: Nombre de la etiqueta
 *                         example: "EtiquetaEjemplo"
 *           example:
 *             id: 31
 *             texto: "Este es un ejemplo de contenido para un post."
 *             PostImgs:
 *               - url: "https://example.com/image1.jpg"
 *               - url: "https://example.com/image2.jpg"
 *             Tags:
 *               - id: 3
 *                 Nombre: "EtiquetaEjemplo"
 *               - id: 4
 *                 Nombre: "Etiqueta2"
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
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: Contenido del post
 *                 example: "Nuevo contenido del post"
 *           example:
 *             texto: "Nuevo contenido del post"
 *     responses:
 *       200:
 *         description: Post modificado exitosamente (solo id, texto y usuarioId)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del post
 *                   example: 31
 *                 texto:
 *                   type: string
 *                   description: Contenido del post
 *                   example: "Nuevo contenido del post"
 *                 usuarioId:
 *                   type: integer
 *                   description: ID del usuario que creó el post
 *                   example: 5
 *             example:
 *               id: 31
 *               texto: "Nuevo contenido del post"
 *               usuarioId: 5
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 atributo:
 *                   type: string
 *                   description: Atributo que causó el error
 *                 mensaje:
 *                   type: string
 *                   description: Descripción del error
 *               example:
 *                 atributo: "texto"
 *                 mensaje: "El campo 'texto' no puede estar vacío."
 *       404:
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             examples:
 *               errorPost:
 *                 value:
 *                   mensaje: "El post con id 31 no existe"
 *     description: Solo se permite modificar el campo 'texto'. No se pueden enviar etiquetas ni imágenes.
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
 *       404:
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             examples:
 *               errorPost:
 *                 value:
 *                   mensaje: "El post con id 31 no existe"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *             example:
 *               - id: 31
 *                 texto: "Este es un ejemplo de contenido para un post."
 *                 usuarioId: 5
 *                 PostImgs:
 *                   - url: "https://example.com/image2.jpg"
 *                 Tags:
 *                   - id: 3
 *                     Nombre: "EtiquetaEjemplo"
 *                 Comments:
 *                   - texto: "Me gusta este post"
 *                     Usuario:
 *                       nickName: "lautaro123"
 *                   - texto: "Buen contenido"
 *                     Usuario:
 *                       nickName: "maria456"
 *               - id: 32
 *                 texto: "Otro ejemplo de contenido para un post."
 *                 usuarioId: 6
 *                 PostImgs: []
 *                 Tags: []
 *                 Comments:
 *                   - texto: "Interesante"
 *                     Usuario:
 *                       nickName: "juan789"
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *             example:
 *               id: 31
 *               texto: "Este es un ejemplo de contenido para un post."
 *               usuarioId: 5
 *               PostImgs:
 *                 - url: "https://example.com/image2.jpg"
 *               Tags:
 *                 - id: 3
 *                   Nombre: "EtiquetaEjemplo"
 *               Comments:
 *                 - texto: "Me gusta este post"
 *                   Usuario:
 *                     nickName: "lautaroActualizado"
 *                 - texto: "Me gusta este post"
 *                   Usuario:
 *                     nickName: "lautaroActualizado"
 *       404:
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             examples:
 *               errorPost:
 *                 value:
 *                   mensaje: "El post con id 31 no existe"
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *             example:
 *               id: 31
 *               texto: "Este es un ejemplo de contenido para un post."
 *               usuarioId: 5
 *               PostImgs:
 *                 - url: "https://example.com/image2.jpg"
 *               Tags:
 *                 - id: 3
 *                   Nombre: "EtiquetaEjemplo"
 *               Comments:
 *                 - texto: "Me gusta este post"
 *                   Usuario:
 *                     nickName: "lautaroActualizado"
 *                 - texto: "Me gusta este post"
 *                   Usuario:
 *                     nickName: "lautaroActualizado"
 *       404:
 *         description: Post no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             examples:
 *               errorPost:
 *                 value:
 *                   mensaje: "El post con id 31 no existe"
 */
route.get("/:postId/all-comments", validarPostById, findByPkAllComments);

module.exports = route;
