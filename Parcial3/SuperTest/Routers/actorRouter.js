const express = require('express');
const router = express.Router();
const { consultaActor, agregarActor, eliminarActor } = require('../controller/actorController');

/**
 * @swagger
 * /actor:
 *   get:
 *     summary: Consulta actor (usando query param id)
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del actor
 *     responses:
 *       200:
 *         description: Actor consultado exitosamente
 */
router.get('/', consultaActor);

/**
 * @swagger
 * /actor/{id}:
 *   get:
 *     summary: Consulta actor por ID (path param)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del actor
 *     responses:
 *       200:
 *         description: Actor consultado exitosamente
 */
router.get('/:id', (req, res) => {
  req.query.id = req.params.id; 
  consultaActor(req, res);
});

/**
 * @swagger
 * /actor:
 *   post:
 *     summary: Agrega un nuevo actor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Actor agregado exitosamente
 */
router.post('/', agregarActor);

/**
 * @swagger
 * /actor/{id}:
 *   delete:
 *     summary: Elimina un actor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del actor
 *     responses:
 *       200:
 *         description: Actor eliminado exitosamente
 */
router.delete('/:id', eliminarActor);

module.exports = { router };
