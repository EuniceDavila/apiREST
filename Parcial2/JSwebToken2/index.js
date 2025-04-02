const path = require("path");
const express = require('express');
const xmlparser = require('express-xml-bodyparser');  
const actoresRoutes = require('./Routers/actorRouter.js'); 
const pug = require('pug');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const winston = require('winston');
const jsonwebtoken = require('jsonwebtoken');
const app = express();
const fs = require('fs');
const { Console } = require("console");

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
  let privada = fs.readFileSync(path.join(__dirname, '/Llaves/privada.pem'), 'utf8');
  const token = jsonwebtoken.sign(req.body, privada, { algorithm: 'RS256' });  
  console.log(token);
  res.json({ token });
});

app.get('/actores', verificarToken,function(req,res,next){
  res.json({mensaje: "Acceso permitido"})
});

function verificarToken(req, res, next) {
  console.log(req.headers.authorization);

  if (!req.headers.authorization) {
    return res.status(401).json({ Error: "No se proporcionó un token" });
  }

  let publica = fs.readFileSync(path.join(__dirname, '/Llaves/publica.pem'), 'utf8');
  let token = req.headers.authorization.split(' ')[1]; // Extraer solo el token

  jsonwebtoken.verify(token, publica, { algorithms: ['RS256'] }, function (err, decoded) {
    if (err) {
      return res.status(403).json({ Error: "Token inválido" });
    } else {
      req.user = decoded; // Guardar datos decodificados en req
      next();
    }
  });
}


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
