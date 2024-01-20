const { Breed } = require('../db');


const deleteDog = async (req, res) => {
    const { id } = req.params;

    try {
        // Encuentra el registro que deseas eliminar por su ID
        const breed = await Breed.findByPk(id);

        if (!breed) {
            return res.status(404).json({ error: 'Breed not found' });
        }

        // Elimina el registro
        await breed.destroy();

        return res.status(204).send(); // Devuelve una respuesta exitosa sin contenido
    } catch (error) {
        console.error('Error deleting breed:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = deleteDog;