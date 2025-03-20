const path = require("path");
const express = require('express');
const xmlparser = require('express-xml-bodyparser');  
const actoresRoutes = require('./Routers/actorRouter.js');  // Ruta de los actores
const pug = require('pug');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const winston = require('winston');
const bearer = require('express-bearer-token');
const app = express();

// Configuración de logs con Winston
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, 'logs', 'error.log') })
  ]
});

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.text());
app.use(xmlparser());
app.use(bearer());

app.use(function(req, res, next) {
  if (req.token === 'eunice') {
    next();  
  } else {
    res.status(401).json({ error: 'Token invalido' });  
  }
});

// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'Vistas')); 


app.use('/actor', actoresRoutes.router);

app.use((req, res, next) => {
  const error = new Error("Error 404 - Ruta no encontrada o actor no encontrado");
  error.status = 404;
  next(error);
});


app.use((err, req, res, next) => {
  // Loguear el error
  logger.error(err.message, { stack: err.stack });
  // Responder con el mensaje de error
  res.status(err.status || 500).json({ error: err.message });
});


app.listen(port, () => { 
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
