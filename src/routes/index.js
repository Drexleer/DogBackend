const { Router } = require('express');
const getAllDogs = require('../controllers/getAllDogs');
const getDogById = require('../controllers/getDogbyId');
const getDogByName = require('../controllers/getDogByName');
const createDog = require('../controllers/createDog');
const getTemperaments = require('../controllers/getTemperaments');
const { apiData, dbData } = require('../controllers/getDogsApis')
const deleteDog = require('../controllers/deleteDog');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter); 
router.use('/dogs/:idRaza', getDogById);
router.use('/dogs', getDogByName);
router.use('/dog', createDog);
router.use('/alldogs', getAllDogs);
router.use('/temperaments', getTemperaments);
router.use('/api', apiData)
router.use('/db', dbData)
router.use('/delete/:id', deleteDog)

module.exports = router;
