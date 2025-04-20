import express from 'express';
import { validateRecaptcha } from '../middlewares/validateRecaptcha.js';
import { submitContactForm } from '../controllers/contact.controller.js';
import { validateContactForm } from '../utils/validationRules.js'
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Ruta real del contacto
router.post(
    '/',
    [
        validateContactForm,    // Validamos los campos
        validateRecaptcha       // Validamos el token de reCAPTCHA
    ],
    submitContactForm
);

// Ruta de prueba SIN recaptcha (solo para testing rápido)
if (process.env.NODE_ENV !== 'production') {
    router.post('/test', async (req, res) => {
        const { nombre, email, mensaje } = req.body;
    
        try {
            // 1. Mandar correo
            await import('../services/email.service.js').then(module =>
                module.sendEmail({ nombre, email, mensaje })
            );
    
            // 2. Guardar en Supabase
            const { data, error } = await supabase
                .from('contact_messages')
                .insert([{ nombre, email, mensaje }])
                .select();
    
            if (error) {
                console.error('Error insertando en Supabase:', error);
                return res.status(500).json({ message: 'Error guardando en Supabase', error: error.message });
            }
    
            res.status(200).json({ message: 'Correo enviado y guardado en Supabase ✅', data });
        } catch (error) {
            console.error('Error en /test:', error);
            res.status(500).json({ message: 'Error general en /test', error: error.message });
        }
    });
}


export default router;
