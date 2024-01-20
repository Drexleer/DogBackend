const axios = require('axios');
const { Breed, Temperament } = require('../db')
const { API, API_KEY } = process.env;

const getAllDogs = async (req, res) => {

    try {
        //Obtener perros de la Api
        const response = await axios.get(`${API}${API_KEY}`)
        const apiDogs = response.data.map((element) => {
            const temperamentsArray = element.temperament ? element.temperament.split(', ') : [];
            return {
                id: element.id,
                name: element.name,
                height: element.height.metric.split(' - '),
                weight: element.weight.metric.split(' - '),
                life_span: element.life_span.replace(' years', '').split(' - '),
                image: `https://cdn2.thedogapi.com/images/${element.reference_image_id}.jpg`,
                temperaments: temperamentsArray,
            }
        });
        //Obtener perros de la Db
        const allDogsDb = await Breed.findAll({
            include: {
                model: Temperament,
                attributes: ['name'], //atributos que quiero traer del modelo Temperament, el id lo trae automático
                through: {
                    attributes: [],//traer mediante los atributos del modelo
                },
            }
        })

        const breedsFromDb = allDogsDb.map((element) => {
            return {
                id: element.id,
                name: element.name,
                height: element.height,
                weight: element.weight,
                life_span: element.life_span,
                image: element.image,
                temperaments: element.temperaments.map(
                    (temperament) => temperament.name
                ),
            };
        });
        //Combinar la base de datos y la api
        const allDogs = [...apiDogs, ...breedsFromDb]

        res.json(allDogs)

    } catch (error) {
        res.status(404).json({ message: 'Error interno del servidor' })
    }
}

module.exports = getAllDogs;