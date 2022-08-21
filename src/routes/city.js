const express = require('express');
const router = express.Router();

//Controllers
const City = require('../controller/city');

//Routes
router.post('/', City.addCity);
router.get('/', City.getCity);  
router.delete('/:id', City.deleteCity); 


module.exports = router;