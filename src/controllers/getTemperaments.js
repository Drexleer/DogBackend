const axios = require('axios');
const { Temperament } = require('../db.js');
const { API, API_KEY } = process.env;

const getTemperaments = async (req, res) => {

    try {
        const response = await axios.get(`${API}${API_KEY}`);
        const temperaments = response.data.map((t) => t.temperament);
        const temps = temperaments.toString().split(',');

        temps.forEach(el => {
            let i = el.trim();
            Temperament.findOrCreate({
                where: { name: i }
            });
        });

        // Obtener todos los temperamentos después de eliminar los registros no deseados
        const allTemperaments = await Temperament.findAll();

        res.json(allTemperaments);
    } catch (error) {
        console.log(error);
    }

};

module.exports = getTemperaments;