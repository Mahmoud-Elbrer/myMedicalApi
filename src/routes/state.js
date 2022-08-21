const express = require('express');
const router = express.Router();

//Controllers
const State = require('../controller/state');

//Routes
router.post('/', State.addState);
router.get('/', State.getState);  
router.delete('/:id', State.deleteState); 


module.exports = router;