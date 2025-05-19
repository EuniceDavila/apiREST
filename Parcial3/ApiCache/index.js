import express from 'express'
import apicache from 'apicache'

const app = express();
const port = 3000;

let cache = apicache.middleware

app.get('/numero', cache('1 minutes'), (req, res) => {
    let aleatorio = Math.floor(Math.random()*100);
    console.log('aleatorio', aleatorio);

  res.json({ num: aleatorio })
})

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});