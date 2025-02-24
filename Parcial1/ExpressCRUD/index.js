const path = require("path");
const express = require('express'); 
const xmlparser = require('express-xml-bodyparser'); 
const actoresRoutes = require('./Routers/actorRouter.js');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = process.env.PORT; 

// Middleware
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

// Usar el enrutador
app.use('/actor', actoresRoutes.router);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send("Error 404");
});

// Iniciar el servidor
app.listen(port, () => { 
  console.log(`Servidor corriendo en http://localhost:${port}`);
});