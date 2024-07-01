require('dotenv').config(); // Cargar las variables de entorno desde .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const secretKey = process.env.SECRET_KEY || 'tu_secreto_para_jwt';

// Configurar CORS
app.use(cors({
    origin: ['http://localhost:8100/login'], // Reemplaza con tu dominio permitido
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));

app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'tu_mongo_uri';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.log('Error al conectar a MongoDB:', err);
});

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Error al autenticar usuario' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
