const path = require("path");
const express = require('express');
const xmlparser = require('express-xml-bodyparser');  
const actoresRoutes = require('./Routers/actorRouter.js'); 
const pug = require('pug');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const winston = require('winston');
const jsonwebtoken = require('jsonwebtoken');
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

app.post('/login', function(req, res, next) {
  console.log("Body recibido:", req.body); // Agrega esta línea
  const token = jsonwebtoken.sign(req.body, 'clave'); 
  //console.log(token);
  res.json({ token });
});

app.get('/actores', verificarToken,function(req,res,next){
  res.json({mensaje: "Acceso permitido"})
});

function verificarToken(req, res, next) {
  console.log(req.headers.authorization);
  if(typeof(req.headers.authorization) == 'undefined') {
    res.json({Error:"Token no enviado"});
  } else {
    let token = req.headers.authorization.substring(7,req.headers.authorization.length);
    jsonwebtoken.verify(token, 'clave', function(err, decoded) {
      if(err) {
        res.json({Error:"Token inválido"});
      } else {
        next();
      }
    });
  }};

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
