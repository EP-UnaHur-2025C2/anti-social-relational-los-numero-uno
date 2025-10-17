const { Router } = require("express");
const tagController = require("../controllers/tagController");
const {
  validarTag,
  validarUpdateTag,
  validarNombreTag,
  validarTagByid,
} = require("../middlewares/validateTags");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - Nombre
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la etiqueta
 *           example: 1
 *         Nombre:
 *           type: string
 *           description: Nombre único de la etiqueta
 *           example: "javascript"
 *           uniqueItems: true
 */

// 1. Crear una nueva etiqueta VERIFICADO
/**
 * @swagger
 * /tags/create-tag:
 *   post:
 *     summary: Crear una nueva etiqueta
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *           examples:
 *             tag:
 *               value:
 *                 Nombre: "javascript"
 *     responses:
 *       201:
 *         description: Etiqueta creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *             examples:
 *               tag:
 *                 value:
 *                   id: 1
 *                   Nombre: "javascript"
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
 *                     - atributo: "Nombre"
 *                       mensaje: "El nombre es obligatorio"
 */
router.post("/create-tag", validarTag, validarNombreTag, tagController.createTag);

// 2. Modificar una etiqueta por su ID VERIFICADO
/**
 * @swagger
 * /tags/modify-tag/{tagId}:
 *   put:
 *     summary: Actualizar una etiqueta por su ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la etiqueta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *           examples:
 *             tag:
 *               value:
 *                 Nombre: "typescript"
 *     responses:
 *       200:
 *         description: Etiqueta actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *             examples:
 *               tag:
 *                 value:
 *                   id: 1
 *                   Nombre: "typescript"
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
 *                     - atributo: "Nombre"
 *                       mensaje: "El nombre es obligatorio"
 */
router.put(
  "/modify-tag/:tagId",
  validarTagByid,
  validarNombreTag,
  validarUpdateTag,
  tagController.updateTag
);

// 3. Eliminar una etiqueta por su ID VERIFICADO
/**
 * @swagger
 * /tags/delete-tag/{tagId}:
 *   delete:
 *     summary: Eliminar una etiqueta por su ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la etiqueta
 *     responses:
 *       204:
 *         description: Etiqueta eliminada correctamente
 *       400:
 *         description: Etiqueta no encontrada
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
 *                   message: "La etiqueta con id 1 no existe"
 */
router.delete("/delete-tag/:tagId", validarTagByid, tagController.deleteTag);

// 4. Obtener todas las etiquetas VERIFICADO
/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Obtener todas las etiquetas
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Lista de etiquetas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 *             examples:
 *               tags:
 *                 value:
 *                   - id: 1
 *                     Nombre: "javascript"
 *                   - id: 2
 *                     Nombre: "typescript"
 */
router.get("/", tagController.getAllTags);

/**
 * @swagger
 * /tags/{tagId}:
 *   get:
 *     summary: Obtener una etiqueta por su ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la etiqueta
 *     responses:
 *       200:
 *         description: Etiqueta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *             examples:
 *               tag:
 *                 value:
 *                   id: 1
 *                   Nombre: "javascript"
 *       400:
 *         description: Etiqueta no encontrada
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
 *                   message: "La etiqueta con id 1 no existe"
 */
router.get("/:tagId", validarTagByid, tagController.getTagById);

module.exports = router;
