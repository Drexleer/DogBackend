const getData = require('../utils/getData');

const getDogById = async (req, res) => {
    const { idRaza } = req.params;

    try {
        const allDogs = await getData();
        const isNumeric = /^\d+$/; // Expresión regular para comprobar si es numérico

        // Condicional para decidir si convertir a número o dejar como cadena de texto
        const idToCompare = idRaza.length <= 3 && isNumeric.test(idRaza)
            ? parseInt(idRaza)
            : idRaza;

        const dog = allDogs.filter(el => el.id === idToCompare);

        if (dog.length) {
            res.status(200).json(dog);
        } else {
            res.status(404).send("Dog not found in the Data");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = getDogById;