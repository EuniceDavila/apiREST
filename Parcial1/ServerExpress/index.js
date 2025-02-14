const express = require('express'); // Importamos Express
const multer  = require('multer'); // Importamos Multer para manejar archivos
const xmlparser = require('express-xml-bodyparser'); // Middleware para parsear XML
const path = require('path'); // Módulo para trabajar con rutas
const app = express(); // Creamos una instancia de Express
const port = 3000; // Definimos el puerto del servidor

// Middleware de aplicación (se ejecuta en todas las peticiones)
app.use('/', (req, res, next) => {
    console.log("Petición al server"); // Muestra mensaje en consola
    next(); // Llama al siguiente middleware
}, (req, res, next) => {
    console.log("2da función Middleware"); // Mensaje adicional en consola
    next(); // Continúa con la ejecución
});

// Middleware incorporado en Express
app.use(express.json()); // Permite recibir datos en formato JSON
app.use(express.text()); // Permite recibir datos en formato de texto plano
app.use(xmlparser()); // Permite recibir datos en formato XML

const folder = path.join(__dirname+'/archivoRecibidos/'); 
 const upload = multer({dest:folder});  
app.use(upload.single('archivo'));

app.get('/alumnos', (req, res,next) => {
    console.log(req.query);
    res.sendFile(__dirname + '/public/index.html');
});

app.patch('/', (req, res) => {
    console.log(req.body);
    res.send('Hola!');
});

app.post('/sistemas/:control', (req, res) => {
    console.log(req.params);
    res.send('Hola!');
});

app.post('/prefectos', (req, res) => {
   // console.log(req.body);
    //res.send('Hola!');
    console.log(`Se recibio el archivo: ${req.file.originalname}`); 
    console.log(req.body); 
    console.log('Se recibio el formulario:'+JSON.stringify(req.body)); 
    res.json(req.body); 
});

// Middleware para manejar rutas no encontradas (Error 404)
app.use((req, res) => {
    res.status(404).send("Error 404"); // Responde con un mensaje de error
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});