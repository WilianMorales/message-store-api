import { validationResult } from 'express-validator';
import { sendEmail } from '../services/email.service.js';
import { saveContactMessage } from '../services/contact.service.js';

export const submitContactForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, mensaje } = req.body;
    const ip = req.ip
    const userAgent = req.get('User-Agent')

    // Log para depuración
    console.log(`📩 Nueva solicitud desde IP: ${ip}, Navegador: ${userAgent}`)

    try {
        // Mandar el correo
        await sendEmail({ nombre, email, mensaje });

        // Guardar en la base de datos
        const { success, message, data } = await saveContactMessage({ nombre, email, mensaje, ip, userAgent });

        // Verificar si el mensaje se guardó correctamente
        if (success) {
            return res.status(200).json({ message: message, data: data });
        } else {
            return res.status(500).json({ message: '❌ Error al guardar el mensaje', error: message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar el formulario', error: error.message });
    }
};
