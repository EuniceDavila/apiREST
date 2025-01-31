const express=require('express');
const app=express();
const port=3000;

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
    //res.send('Hola mundo');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`); 
});