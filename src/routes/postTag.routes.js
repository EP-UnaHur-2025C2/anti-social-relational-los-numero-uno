const express = require('express');
const postTagController = require('../controllers/postTag.controller');
const { validatePostTagAssociation } = require('../middlewares/validatePostTag');
const router = express.Router();


// ASOCIA UN TAG A UN POST
router.post('/:postId/tags', validatePostTagAssociation, postTagController.addTagToPost); 

// Obtiene todas las etiquetas de un post
router.get('/:postId/tags', postTagController.getTagsByPostId);

// BORRAR
router.delete('/:postId/tags/:tagId', validatePostTagAssociation, postTagController.removeTagFromPost); 

module.exports = router;