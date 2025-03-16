const express = require('express');
const { check, validationResult } = require('express-validator');
const { consultaActor, agregarActor, eliminarActor } = require('../controller/actorController');

const router = express.Router();

// Función de validación
const validarActor = [
    check('nombre', 'El nombre solo debe contener letras y espacios').isAlpha('es-ES', { ignore: ' ' }),
    check('genero', 'El género debe ser Masculino, Femenino u Otro').isIn(['Masculino', 'Femenino', 'Otro']),
    check('nacionalidad', 'La nacionalidad solo debe contener letras y espacios').isAlpha('es-ES', { ignore: ' ' }),
    check('peliculaMasExitosa', 'El nombre de la película solo puede contener letras, números y espacios').isAlphanumeric('es-ES', { ignore: ' ' }),
    check('premios', 'Los premios deben ser un número entero positivo').isInt({ min: 0 }),
];

// Ruta GET para consultar actores
router.get('/', consultaActor);

// Ruta POST para agregar un actor
router.post('/', validarActor, (req, res, next) => {
    // Captura los errores de validación
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    // Si no hay errores, llamar a la función para agregar al actor
    agregarActor(req, res, next);
});

// Ruta DELETE para eliminar un actor
router.delete('/:id', eliminarActor);

module.exports = { router };
