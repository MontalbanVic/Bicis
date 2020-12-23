var express = require('express');
var router = express.Router();
var usuarioControllerAPI = require('../../controllers/api/usuarioControllerAPI');
const { route } = require('./bicicletas');

router.get('/', usuarioControllerAPI.usuarios_list);
router.post('/create', usuarioControllerAPI.usuarios_create);
router.post('/reservar', usuarioControllerAPI.usuario_reservar);

module.exports = router;