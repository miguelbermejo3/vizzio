require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./db'); // Importar la conexión a la base de datos
const authRoutes = require('./routes/auth'); // Importar las rutas de autenticación

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // Usar las rutas de autenticación con prefijo '/api/auth'

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
