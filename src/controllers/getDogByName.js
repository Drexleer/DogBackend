const getData = require('../utils/getData');

const getDogsByName = async (req, res) => {
    const { name } = req.query;
    const allDogs = await getData();
    try {
        if (name) {
            const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase())); //si el perro existe guardare sus parámetros aca.
            dog.length ? res.status(200).send(dog) : res.status(404).send("Dog not found");
        } else {
            res.status(200).send(allDogs);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = getDogsByName;