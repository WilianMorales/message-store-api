import { validationResult } from 'express-validator';
import { sendEmail } from '../services/email.service.js';
import { saveContactMessage } from '../services/contact.service.js';

export const submitContactForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, mensaje } = req.body;

    try {
        // 1. Mandar el correo
        await sendEmail({ nombre, email, mensaje });

        // 2. Guardar en la base de datos
        const { success, error } = await saveContactMessage({ nombre, email, mensaje });

        // Verificar si el mensaje se guardó correctamente
        if (success) {
            return res.status(200).json({ message: 'Formulario enviado correctamente ✅' });
        } else {
            console.error('Error al guardar el mensaje:', error);
            return res.status(500).json({ message: 'Error al guardar el mensaje', error });
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        res.status(500).json({ message: 'Error al enviar el formulario', error: error.message });
    }
};
