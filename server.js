import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import contactRoutes from './routes/contact.routes.js';
import healthRoutes from './routes/health.routes.js';

dotenv.config();

import rateLimit from 'express-rate-limit';

const app = express();

// Trust proxy si estás en Railway
app.set('trust proxy', 1);

// Middlewares
app.use(cors(
    {
        origin: 'https://wilianmorales.github.io',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(express.json());

// Ruta de salud
app.use('/', healthRoutes);

// Limite de 2 solicitudes por minuto por IP
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 2,
    message: '⏳ Has alcanzado el límite de solicitudes. Intenta más tarde.'
});

// Rutas principales
app.use('/api/contact', limiter, contactRoutes);

// Middleware de errores generales
app.use((err, req, res, next) => {
    console.error('❌ Error no manejado:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT} (${process.env.NODE_ENV || 'development'})`);
});
