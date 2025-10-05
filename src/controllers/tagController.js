

const db = require('../db/models'); 
const Tag = db.Tag; 

// CREAR TAG


const createTag = async (req, res) => {
    try {
        const { Nombre } = req.body; 
        
        const nuevoTag = await Tag.create({ Nombre });

        res.status(201).json(nuevoTag);

    } 
    catch (error) {
        console.error('Error al crear la tag:', error);
        
        if (error.name === 'SequelizeUniqueConstraintError') {
             return res.status(409).json({ 
                message: `La tag con el nombre '${req.body.Nombre}' ya existe.`
            });
        }
        
        res.status(500).json({ 
            message: 'Error interno del servidor al crear la tag.',
            error: error.message
        });
    }
};

// OBTENER TODAS LAS TAGS

const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        
        res.status(200).json(tags);

    } 
    catch (error) {
        console.error('Error al obtener todas las tags:', error);
        res.status(500).json({ 
            message: 'Error  al obtener las tags.',
            error: error.message
        });
    }
};


// OBTENER TAG POR ID

const getTagById = async (req, res) => {
    try {
        const { id } = req.params; 

        const tag = await Tag.findByPk(id);

        if (!tag) { // Si no la encuentra lanza 404
            return res.status(404).json(); 
        }
        
        res.status(200).json(tag);

    } catch (error) {
        console.error(`Error al obtener la tag con ID ${req.params.id}:`, error);
        res.status(500).json({ 
            message: 'Error interno del servidor al obtener la tag.',
            error: error.message
        });
    }
};


// 4. ACTUALIZAR 

const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre } = req.body;

        const tag = await Tag.findByPk(id);

        if (!tag) {
            return res.status(404).json();
        }

        await tag.update({ Nombre });

        res.status(200).json({ 
            message: 'tag actualizada',
            tag: tag
        });

    } 
    catch (error) {
        console.error(`Error al actualizar la tag con ID ${req.params.id}:`, error);
        
        if (error.name === 'SequelizeUniqueConstraintError') {
             return res.status(409).json({
                message: `El nombre '${req.body.Nombre}' ya está siendo usado por otra tag.`
            });
        }
        res.status(500).json({ 
            message: 'Error al actualizar la tag.',
            error: error.message
        });
    }
};


// 5. ELIMINAR

const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRows = await Tag.destroy({
            where: { id: id }
        });

        
        if (deletedRows === 0) { // Si no se eliminó ninguna fila, lanza 404
            return res.status(404).json(); 
        }


    } catch (error) {
        console.error(`Error al eliminar la tag con ID ${req.params.id}:`, error);
        res.status(500).json({ 
            message: 'Error interno del servidor al eliminar la tag. Podría estar en uso.',
            error: error.message
        });
    }
};


module.exports = { 
    createTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag,
};