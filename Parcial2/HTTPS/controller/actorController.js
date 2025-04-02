const mysql = require('mysql2');
const path = require("path");
const halson = require('halson'); 
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Obtener actores (todos o uno por ID)
function consultaActor(req, res, next) {
    try {
        let consulta = req.query.id
            ? `SELECT * FROM Actores WHERE id = ${connection.escape(req.query.id)}`
            : 'SELECT * FROM Actores';

        connection.query(consulta, (err, results) => {
            if (err) return next(err); 

            if (results.length === 0) { 
                const error = new Error("Actor no encontrado");
                error.status = 404;
                return next(error); 
            }

            // Enviar los datos a la vista Pug
            res.render('actor', { 
                actor: results[0]  
            });
        });
    } catch (error) {
        next(error); 
    }
}

// Agregar actor
function agregarActor(req, res, next) {
    const { nombre, genero, nacionalidad, peliculaMasExitosa, premios } = req.body;

    if (!nombre || !genero || !nacionalidad || !peliculaMasExitosa || premios === undefined) {
        const error = new Error("Faltan datos del actor");
        error.status = 400;
        return next(error); 
    }

    const consulta = `INSERT INTO Actores (nombre, genero, nacionalidad, peliculaMasExitosa, premios) VALUES (?, ?, ?, ?, ?)`;
    connection.query(consulta, [nombre, genero, nacionalidad, peliculaMasExitosa, premios], (err, result) => {
        if (err) return next(err); 

        const nuevoActor = {
            id: result.insertId,
            nombre,
            genero,
            nacionalidad,
            peliculaMasExitosa,
            premios
        };
        res.json({ mensaje: "Actor agregado correctamente", resultado: nuevoActor });
    });
}

// Eliminar actor
function eliminarActor(req, res, next) {
    const id = req.params.id;

    if (!id) {
        const error = new Error("Falta el ID del actor");
        error.status = 400;
        return next(error); 
    }

    const consulta = `DELETE FROM Actores WHERE id = ?`;
    connection.query(consulta, [id], (err, result) => {
        if (err) return next(err); 

        if (result.affectedRows === 0) {
            const error = new Error("Actor no encontrado");
            error.status = 404;
            return next(error); 
        }
        res.json({ mensaje: "Actor eliminado correctamente" });
    });
}

module.exports = {
    consultaActor,
    agregarActor,
    eliminarActor
};
