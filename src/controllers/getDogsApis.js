const axios = require('axios');
const { Breed, Temperament } = require('../db');
const { API, API_KEY } = process.env;

const apiData = async (req, res) => {

    try {
        const response = await axios.get(`${API}${API_KEY}`)
        const apiDogs = response.data.map((element) => {
            return {
                id: element.id,
                name: element.name,
                height: element.height.metric.split(' - '),
                weight: element.weight.metric.split(' - '),
                life_span: element.life_span.replace(' years', '').split(' - '),
                image: `https://cdn2.thedogapi.com/images/${element.reference_image_id}.jpg`,
                temperaments: element.temperament,
            }
        })
        res.status(200).json(apiDogs);

    } catch (error) {
        console.log(error);
    }
};

const dbData = async (req, res) => {

    try {
        const allDogsDb = await Breed.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });
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
        res.status(200).json(breedsFromDb);

    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    apiData,
    dbData
};