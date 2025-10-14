

const express = require('express');

const tagController = require('../controllers/tagController');
const { validateTag } = require('../middlewares/validateTags'); 



const router = express.Router();


// (Crear una nueva etiqueta)
router.post('/', tagController.createTag); 


// (Obtener todas las etiquetas)
router.get('/', tagController.getAllTags); 


// (Obtener una etiqueta por su ID)
router.get('/:id', tagController.getTagById); 


// (Actualizar una etiqueta por su ID)
router.put('/:id', tagController.updateTag); 


// Delete (Eliminar una etiqueta por su ID)
router.delete('/:id', tagController.deleteTag); 


module.exports = router;