const { Breed, Temperament } = require('../db');

const createDog = async (req, res) => {
    // console.log(req.body);
    try {
        let {
            name,
            min_height,
            max_height,
            min_weight,
            max_weight,
            min_life,
            max_life,
            temperaments,
            image,
        } = req.body;
        if (!image) {
            image = "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg";
        }

        // Unimos las alturas.
        const mixedHeight = [];
        mixedHeight.push(min_height, max_height);
        // Unimos las anchuras.
        const mixedWeight = [];
        mixedWeight.push(min_weight, max_weight);
        // Unimos el tiempo de vida.
        const mixedLife = [];
        mixedLife.push(min_life, max_life);
        // Creamos nuestro modelo.
        let newBreed = await Breed.create({
            name,
            height: mixedHeight,
            weight: mixedWeight,
            life_span: mixedLife,
            image,
        });
        //console.log(temperaments);
        // Buscamos los temperamentos en la db.
        temperaments.map(async (temperament) => {
            const associateTemperament = await Temperament.findAll({
                where: { name: temperament },
            });
            // Lo asociamos con la raza creada.
            await newBreed.addTemperament(associateTemperament);
        });
        // console.log(newBreed);
        res.status(200).send(newBreed);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = createDog;


