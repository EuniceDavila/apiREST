const express = require('express');
const path = require("path");
const xmlparser = require('express-xml-bodyparser');
const actoresRoutes = require('./Routers/actorRouter');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const swaggerJsdoc = require('swagger-jsdoc');
const redoc = require('redoc-express');

const app = express();
const port = process.env.PORT || 3000;

// Swagger (OpenAPI) config
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Actores",
      version: "1.0.0",
      description: "Documentación de la API de actores"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: [path.join(__dirname, './Routers/*.js')],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

// Rutas
app.use('/actor', actoresRoutes.router);

app.get('/api-docs', redoc({
  title: 'API Actores',
  specUrl: '/api-docs-json',
}));

// JSON de la documentación OpenAPI
app.get("/api-docs-json", (req, res) => {
  res.json(swaggerSpec);
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send("Error 404");
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Documentación Redoc en: http://localhost:${port}/api-docs`);
});
