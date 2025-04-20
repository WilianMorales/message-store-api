import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import contactRoutes from './routes/contact.routes.js';
import healthRoutes from './routes/health.routes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de salud
app.use('/', healthRoutes);

// Rutas principales
app.use('/api/contact', contactRoutes);

// Middleware de errores generales
app.use((err, req, res, next) => {
    console.error('❌ Error no manejado:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT} (${process.env.NODE_ENV || 'development'})`);
});
