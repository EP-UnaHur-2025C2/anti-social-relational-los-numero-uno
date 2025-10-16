
exports.validateTag = (req, res, next) => {

    const { Nombre } = req.body;

    // erificar que el campo 'Nombre' esté presente
    if (!Nombre) {
        return res.status(400).json({ 
            message: 'El campo "Nombre" es obligatorio para crear o actualizar una etiqueta.' 
        });
    }

    // Verifica que el nombre no esté vacío o solo sean espacios
    const nombreLimpio = Nombre.trim();
    if (nombreLimpio.length === 0) {
        return res.status(400).json({ 
            message: 'El nombre de la etiqueta no puede estar vacío.' 
        });
    }

    //Limitar la longitud del nombre (ejemplo: máx 50 caracteres)
    if (nombreLimpio.length > 50) {
        return res.status(400).json({ 
            message: 'El nombre de la etiqueta no puede exceder los 50 caracteres.' 
        });
    }

    next();
};