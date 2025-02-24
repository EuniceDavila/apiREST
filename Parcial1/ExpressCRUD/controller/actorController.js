const mysql = require('mysql2');
const path = require("path");
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
function consultaActor(req, res) {
    let consulta = req.query.id 
        ? `SELECT * FROM Actores WHERE id = ${connection.escape(req.query.id)}`
        : 'SELECT * FROM Actores';

    connection.query(consulta, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error en el servidor" });
        }
        if (results.length > 0) {
            res.json({ resultado: results });
        } else {
            res.status(404).json({ error: "Actor no encontrado" });
        }
    });
}

//Agregar actor
function agregarActor(req, res) {
    //console.log(req.body); 
    const { nombre, genero, nacionalidad, peliculaMasExitosa, premios } = req.body;

    // Verifica que todos los campos necesarios están presentes
    if (!nombre || !genero || !nacionalidad || !peliculaMasExitosa || premios === undefined) {
        return res.status(400).json({ error: "Faltan datos del actor" });
    }

    const consulta = `INSERT INTO Actores (nombre, genero, nacionalidad, peliculaMasExitosa, premios) VALUES (?, ?, ?, ?, ?)`;
    connection.query(consulta, [nombre, genero, nacionalidad, peliculaMasExitosa, premios], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error al insertar actor" });
        }
        res.json({ mensaje: "Actor agregado correctamente", id: result.insertId });
    });
}

// Eliminar un actor por ID
function eliminarActor(req, res) {
    const id = req.params.id;
    
    if (!id) {
        return res.status(400).json({ error: "Falta el ID del actor" });
    }

    const consulta = `DELETE FROM Actores WHERE id = ?`;
    connection.query(consulta, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error al eliminar actor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Actor no encontrado" });
        }
        res.json({ mensaje: "Actor eliminado correctamente" });
    });
}

module.exports = {
    consultaActor,
    agregarActor,
    eliminarActor
};