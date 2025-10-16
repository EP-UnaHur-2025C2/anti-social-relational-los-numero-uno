const { Router } = require('express');
const {
  findAll,
  findByPk,
  createUser,
  actualizarUser,
  eliminarUser,
} = require("../controllers/usuarioController.js");

const {
  validarUser,
  validarUserById,
  validarUserUpdate,
  validarNickName
} = require("../middlewares/validateUsuario.js");
const route = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nickName
 *         - mail
 *       properties:
 *         nickName:
 *           type: string
 *           description: Nombre de usuario alfanumérico (único)
 *           example: "lautaro123"
 *           uniqueItems: true
 *         mail:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *           example: "lautaro@gmail.com"
*/

//1. crear usuario VERIFICADO
/**
 * @swagger
 * /usuarios/create-usuario:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           examples:
 *             usuario:
 *               value:
 *                 nickName: "lautaro123"
 *                 mail: "lautaro@gmail.com"
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             examples:
 *               usuario:
 *                 value:
 *                   nickName: "lautaro123"
 *                   mail: "lautaro@gmail.com"
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
 *                     - atributo: "nickName"
 *                       mensaje: "nickName es obligatorio"
 *                     - atributo: "mail"
 *                       mensaje: "mail debe ser un email válido"
 */
route.post("/create-usuario", validarNickName,validarUser, createUser);


//2. actualizar usuario VERIFICADO
/**
 * @swagger
 * /usuarios/modify-usuario/{userId}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           examples:
 *             usuario:
 *               value:
 *                 nickName: "lautaroActualizado"
 *                 mail: "nuevoemail@gmail.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             examples:
 *               usuario:
 *                 value:
 *                   nickName: "lautaroActualizado"
 *                   mail: "nuevoemail@gmail.com"
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
 *                     - atributo: "nickName"
 *                       mensaje: "nickName es obligatorio"
 *                     - atributo: "mail"
 *                       mensaje: "mail debe ser un email válido"
 */
route.put("/modify-usuario/:userId", validarNickName, validarUserById, actualizarUser);

//3. eliminar usuario VERIFICADO
/**
 * @swagger
 * /usuarios/delete-usuario/{userId}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuario eliminado correctamente
 *       400:
 *         description: Error de validación
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
 *                   message: "El user con id 123 no existe"
 */
route.delete("/delete-usuario/:userId", validarUserById, eliminarUser);

//4. obtener todos los usuarios VERIFICADO
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *             examples:
 *               usuarios:
 *                 value:
 *                   - nickName: "lautaro123"
 *                     mail: "lautaro@gmail.com"
 *                   - nickName: "maria456"
 *                     mail: "maria@gmail.com"
 */
route.get("/", findAll);

//5. obtener usuario por ID VERIFICADO
/**
 * @swagger
 * /usuarios/{userId}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             examples:
 *               usuario:
 *                 value:
 *                   nickName: "lautaro123"
 *                   mail: "lautaro@gmail.com"
 *       400:
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
 *                   message: "El user con id 123 no existe"
*/
route.get("/:userId", validarUserById, findByPk);

module.exports = route;