const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = 3000;

// Configuración de CORS con credenciales
app.use(cors({
  origin: 'http://localhost:5173',  // URL del tu frontend =App.js
  credentials: true,
}));

// Configuración de session con un secreto para encriptar
app.use(session({
  secret: 'seguridad',  // Cambia esto por un valor seguro
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }  
}));

// Conexión a la base de datos
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Maleja900*',
    database: 'login',
});

// ruta de inicio de sesion
app.get('/login', async (req, res) => {
    const { usuario, clave } = req.query;

    try {
        const [results] = await connection.query(
            "SELECT * FROM `usuarios` WHERE `usuario` = ? AND `clave` = ?",
            [usuario, clave]
        );

        if (results.length > 0) {
            // Si el login es exitoso el usuario permanece conectado
            req.session.usuario = usuario;  // guardado el usuario en la sesión
            res.status(200).send('Inicio de sesión correcto');
        } else {
            res.status(401).send('Datos incorrectos');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
});

// ruta para validar la sesión
app.get('/validar', (req, res) => {
    if (req.session.usuario) {
        res.status(200).send('Sesión validada');
    } else {
        res.status(401).send('No autorizado');
    }
});

// ruta para cerrar sesion
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.status(200).send('Sesión cerrada');
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
