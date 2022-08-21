const express = require('express');
const router = express.Router();

//Controllers
const Specialize = require('../controller/specialize');

//Routes
router.post('/', Specialize.addSpecialize);
router.get('/', Specialize.getSpecialize);  
router.delete('/:specializeId', Specialize.deleteSpecialize); 


module.exports = router;