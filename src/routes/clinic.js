const express = require('express');
const router = express.Router();

//Controllers
const Clinic = require('../controller/clinic');

//Routes
router.post('/', Clinic.addClinic);
router.get('/', Clinic.getClinic);  
router.delete('/:Id', Clinic.deleteClinic); 


module.exports = router;