const validatePostTagAssociation = (req, res, next) => {
        const postId = req.body.PostID || req.params.postId;
    
    const tagId = req.body.TagID || req.params.tagId;

    // Verifica que existe
    if (!postId || !tagId) {
        return res.status(400).json({ 
            message: 'Tanto PostID como TagID son obligatorios para esta operación de asociación.' 
        });
    }

    // Verifica que sean números enteros positivos válidos
    const isPostIDValid = Number.isInteger(Number(postId)) && Number(postId) > 0;
    const isTagIDValid = Number.isInteger(Number(tagId)) && Number(tagId) > 0;

    if (!isPostIDValid || !isTagIDValid) {
        return res.status(400).json({ 
            message: 'PostID y TagID deben ser números enteros positivos.' 
        });
    }
    

    next();
};

module.exports = {
    validatePostTagAssociation
};