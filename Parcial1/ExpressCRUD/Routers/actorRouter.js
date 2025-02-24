const express = require('express');
const router = express.Router();
const { consultaActor, agregarActor, eliminarActor } = require('../controller/actorController');

// Define las rutas
router.get('/', consultaActor);
router.post('/', agregarActor);
router.delete('/:id', eliminarActor);

module.exports = { router };