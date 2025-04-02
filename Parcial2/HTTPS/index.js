const path = require("path");
const express = require('express');
const xmlparser = require('express-xml-bodyparser');  
const actoresRoutes = require('./Routers/actorRouter.js'); 
const pug = require('pug');
const fs = require('fs');
const https = require('https');
const winston = require('winston');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

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

// Configuración de HTTPS
const options = {
  key: fs.readFileSync(path.join(__dirname, 'Certificado/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'Certificado/cert.pem')),
  passphrase: process.env.CERT_PASSWORD
};

// Middleware
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

app.get('/', (req, res) => {
  res.json({ mensaje: "Servidor Express contestando" });
});

// Rutas
app.get('/actores', function(req, res, next) {
  res.json({ mensaje: "Acceso permitido" });
});

// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'Vistas'));

app.use('/actor', actoresRoutes.router);

// Manejo de errores 404
app.use((req, res, next) => {
  const error = new Error("Error 404 - Ruta no encontrada o actor no encontrado");
  error.status = 404;
  next(error);
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  res.status(err.status || 500).json({ error: err.message });
});

// Iniciar servidor HTTPS
https.createServer(options, app).listen(port, () => {
  console.log(`Servidor HTTPS corriendo en https://localhost:${port}`);
});
