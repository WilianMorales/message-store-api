import dotenv from 'dotenv';
dotenv.config();

export const validateRecaptcha = async (req, res, next) => {
    const { recaptchaToken } = req.body;

    if (!recaptchaToken) {
        return res.status(400).json({ message: 'reCAPTCHA token requerido' });
    }

    try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;

        // Verificar que la clave secreta esté definida
        if (!secretKey) {
            return res.status(500).json({ message: 'Falta la clave secreta de reCAPTCHA en las variables de entorno' });
        }

        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify`;

        const params = new URLSearchParams();
        params.append('secret', secretKey);
        params.append('response', recaptchaToken);

        const response = await fetch(verificationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        });

        const data = await response.json();

        // Verificar si los datos esperados están presentes
        if (!data || !data.success) {
            return res.status(400).json({ message: 'Falló la verificación de reCAPTCHA.' });
        }
        
        const { success, score } = data;

         // Validación del score para asegurarse de que no sea un bot
         if (score < 0.5) {
            return res.status(400).json({ 
                message: `Score bajo en reCAPTCHA (posible bot). Puntuación: ${score}` 
            });
        }

        next();

    } catch (error) {
        console.error('Error validando reCAPTCHA:', error);
        return res.status(500).json({ message: 'Error validando reCAPTCHA', error: error.message });
    }
};
