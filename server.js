const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = 3000;

// Claves de acceso
const STAFF_KEY = '42432234324242';
const ADMIN_KEY = '6547575675675686788796786';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Rutas específicas para archivos HTML
app.get('/tournaments.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'tournaments.html'));
});

app.get('/discord.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'discord.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/winners.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'winners.html'));
});

app.get('/news.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'news.html'));
});

app.get('/faq.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'faq.html'));
});
app.get('/faq.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'administradores.html'));
});
app.get('/log.admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'log.admin.html'));
});


// Ruta para el login de staff
app.post('/login', (req, res) => {
    const { key } = req.body;

    if (key === STAFF_KEY) {
        return res.json({ message: 'Acceso permitido', redirect: '/staff-panel.html' });
    } else {
        return res.status(403).json({ message: 'Clave incorrecta para staff' });
    }
});

// Ruta para el login de administradores
app.post('/admin-login', (req, res) => {
    const { key } = req.body;

    if (key === ADMIN_KEY) {
        return res.json({ message: 'Acceso permitido', redirect: '/administradores.html' });
    } else {
        return res.status(403).json({ message: 'Clave incorrecta para administradores' });
    }
});

// Manejo de archivos no encontrados (404)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
