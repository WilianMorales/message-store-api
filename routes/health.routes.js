import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer el package.json
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));

router.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API funcionando correctamente 🚀',
        version:  pkg.version,
        environment: process.env.NODE_ENV || 'development'
    });
});

export default router;