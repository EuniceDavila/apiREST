require('dotenv').config(); 
const express = require('express'); 
const xmlparser = require('express-xml-bodyparser'); 
const path = require('path');
const actoresRoutes = require('./Routers/actorRouter.js');
const { Server } = require('http');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

// Usar el enrutador
app.use('/actor', actoresRoutes.router);

app.use((req,res)=>{
  res.status(404);
  res.send("Error 404")
})

app.listen(port, () => { 
  console.log(`Servidor corriendo en http://localhost:${port}`);
});