const express = require('express');
const bearer = require('express-bearer-token');

const app = express();
const port = 3000;

app.use(bearer());

app.use(function(req, res, next){
    if(req.token === 'eunice'){
        next();
    } else {
        res.status(401).json({ error: 'Token invalido' });
    }
});

app.get('/', (req, res) => {
    res.send("Hola Mundo");
});

app.listen(port, () => { 
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
