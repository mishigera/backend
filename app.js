const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth.routes');
const imageRoutes = require('./routes/image.routes');

const app = express();
const cors = require('cors');

app.use(cors({
  origin:'*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo conectado'))
  .catch((err) => console.error('Error de conexión:', err));

// Rutasconst imageRoutes = require('./routes/images');

app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

module.exports = app;
