const express = require('express');
const app = express();
const xmlparser = require('express-xml-bodyparser');
const port=3000;

//Middleware de aplicación
/*app.use('/', (req, res, next) => {
    console.log("Petición al server");
    next();
}, (req, res, next) => {
    console.log("2da función Middleware");
    next();
});*/

//Middleware incorporado en express
app.use(express.json());
app.use(express.text());
app.use(xmlparser());


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
    console.log(req.body);
    res.send('Hola!');
});

app.use((req, res) => {
    res.status(404).send("Error 404");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});