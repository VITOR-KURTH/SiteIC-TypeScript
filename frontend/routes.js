const express = require('express'); 
const router = express.Router(); 

const controller = require('./controller'); 
router.get('/usuarios', controller.getUsuarios); 
router.get('/usuarios/:email', controller.getUsuariosByPlaca); 
router.post('/usuarios', controller.createUsuarios); 
router.put('/usuarios/:email', controller.updateUsuarios); 
router.delete('/usuarios/:email', controller.deleteUsuarios); 

module.exports = router;
