const http = require('http');

let server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': '*' }); 
    //res.writeHead(200, { 'Access-Control-Allow-Origin': '*' }); 
    res.end('hello world!');
});

server.listen(8080, () => {
    console.log("Servidor HTTP corriendo en el puerto 8080");
});

