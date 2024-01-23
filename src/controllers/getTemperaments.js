const { Temperament } = require('../db.js');

const getTemperaments = async (req, res) => {
  try {
    // Obtener todos los temperamentos desde la base de datos
    const allTemperaments = await Temperament.findAll();

    res.json(allTemperaments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send('Error al obtener los temperamentos desde la base de datos.');
  }
};

module.exports = getTemperaments;

//* Ejecutar solo si la base de datos esta vacía
// const axios = require('axios');
// const { API, API_KEY } = process.env;

// const getTemperaments = async (req, res) => {

//     try {
//         const response = await axios.get(`${API}${API_KEY}`);
//         const temperaments = response.data.map((t) => t.temperament);
//         const temps = temperaments.toString().split(',');

//         temps.forEach(el => {
//             let i = el.trim();
//             Temperament.findOrCreate({
//                 where: { name: i }
//             });
//         });

//         // Obtener todos los temperamentos después de eliminar los registros no deseados
//         const allTemperaments = await Temperament.findAll();

//         res.json(allTemperaments);
//     } catch (error) {
//         console.log(error);
//     }

// };

//module.exports = getTemperaments;
