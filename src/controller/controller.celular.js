const celularmodel = require('../model/celular');
const cloudinary = require('../config/cloudinary');

//crear celular
const postCelular = async (req, res) => {
    const { titulo, descripcion } = req.body;
    const errores = [];

    // Validación de campos
    if (!titulo) errores.push("El título es obligatorio.");
    if (!descripcion) errores.push("La descripción es obligatoria.");
    if (!req.files || !req.files.imagen) errores.push("La imagen es obligatoria.");

    // Si hay errores, los devolvemos en la respuesta
    if (errores.length > 0) {
        return res.status(400).json({ msg: "Errores en los datos enviados", errores });
    }

    const imagen = req.files.imagen;

    try {
        const uploaded = await cloudinary.uploader.upload(imagen.tempFilePath, {
            folder: "celulares",
        });
        const { secure_url } = uploaded;

        celularmodel.crearCelular(titulo, descripcion, secure_url, (err, result) => {
            if (err) {
                return res.status(400).json({ msg: "Error al crear el celular" });
            }
            return res.status(201).json({ msg: "Celular creado correctamente" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al subir la foto", error });
    }
};


//actualizar celular
const updateCelular = async (req, res) => {
    const { titulo, descripcion } = req.body;
    const { id } = req.params;

    if (!titulo || !descripcion) {
        return res.status(400).json({ message: 'Faltan campos requeridos: titulo y descripcion' });
    }

    try {
        let imagenUrl = null;

        // Si se envía una imagen, súbela a Cloudinary
        if (req.files && req.files.imagen) {
            const uploaded = await cloudinary.uploader.upload(req.files.imagen.tempFilePath, {
                folder: "celulares",
            });
            imagenUrl = uploaded.secure_url;
        }

        // Actualizar celular en la base de datos
        celularmodel.actualizarCelular(id, titulo, descripcion, imagenUrl, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al actualizar celular', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Celular no encontrado para actualizar' });
            }
            res.json({ message: 'Celular actualizado correctamente' });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al procesar la solicitud', error });
    }
};


//eliminar celular
const deleteCelular = (req, res) => {
    const { id } = req.params;

    celularmodel.eliminarCelular(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar celular', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Celular no encontrada para eliminar' });
        }
        res.json({ message: 'Celular eliminada' });
    });
}

//listar celulares
const getCelulares = (req, res) => {
    celularmodel.mostrarCelulares((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener celulares', error: err });
        }
        res.json(result);
    });
}

//listar celular por id
const getCelularId = (req, res) => {
    const { id } = req.params;

    celularmodel.mostrarCelularId(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener celular', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Celular no encontrada' });
        }
        res.json(result);
    });
}

module.exports = { postCelular, updateCelular, deleteCelular, getCelulares, getCelularId };