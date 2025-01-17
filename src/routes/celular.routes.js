const express = require('express');
const router = express.Router();
const controller_celular = require('../controller/controller.celular');

router.post('/celular', controller_celular.postCelular);
router.get('/celular', controller_celular.getCelulares);
router.get('/celular/:id', controller_celular.getCelularId);
router.put('/celular/:id', controller_celular.updateCelular);
router.delete('/celular/:id', controller_celular.deleteCelular);

module.exports = router;