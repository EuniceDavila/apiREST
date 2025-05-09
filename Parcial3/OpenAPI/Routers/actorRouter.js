const express = require('express');
const router = express.Router();
const { consultaActor } = require('../controller/actorController');

/**
 * @swagger
 * /actor/{id}:
 *   get:
 *     summary: Obtener actor por ID
 *     description: Devuelve los detalles de un actor especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del actor
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Actor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: "Nombre del Actor"
 *                 genero:
 *                   type: string
 *                   example: "Masculino"
 *                 nacionalidad:
 *                   type: string
 *                   example: "Mexicana"
 *                 peliculaMasExitosa:
 *                   type: string
 *                   example: "Película Exitosa"
 *                 premios:
 *                   type: integer
 *                   example: 3
 *       404:
 *         description: Actor no encontrado
 *       500:
 *         description: Error en el servidor
 *     x-codeSamples:
 *       - lang: "JavaScript"
 *         label: "Fetch Example"
 *         source: |
 *           fetch('http://localhost:3000/actor/1')
 *             .then(response => response.json())
 *             .then(data => console.log(data))
 *             .catch(error => console.error('Error:', error));
 *       - lang: "Python"
 *         label: "HttpClient Ejemplo"
 *         source: |
 *           import http.client
 *           
 *           conn = http.client.HTTPConnection("localhost", 3000)
 *           conn.request("GET", "/actor/1")
 *           response = conn.getresponse()
 *           result = response.read()
 *           print(result.decode("utf-8"))
 *       - lang: "curl"
 *         label: "Curl Example"
 *         source: |
 *           curl -X GET http://localhost:3000/actor/1
 */

router.get('/:id', consultaActor);

module.exports = { router };
