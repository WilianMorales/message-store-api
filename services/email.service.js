import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

// Verificamos que las variables necesarias estén presentes
const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, RECEIVER_EMAIL } = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !RECEIVER_EMAIL) {
    throw new Error('Faltan variables de entorno para configurar el transporte de correo.');
}

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: {
        user: SMTP_USER,   // Tu email
        pass: SMTP_PASS    // Tu contraseña o app password
    }
});

export const sendEmail = async ({ nombre, email, mensaje }) => {
    if (!nombre || !email || !mensaje) {
        throw new Error('Nombre, email y mensaje son requeridos para enviar el correo.');
    }

    const mailOptions = {
        from: `"${nombre}" <${email}>`,
        to: RECEIVER_EMAIL, // A donde quieres recibir el mensaje
        subject: 'Nuevo mensaje de portafolio',
        html: `
        <h2>Nuevo mensaje de contacto 🚀</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `
    };

    try {
        const info = await transporter.sendMail(mailOptions);

        if (process.env.NODE_ENV !== 'production') {
            console.log('✅ Correo enviado:', info.response);
        }

        return info;
    } catch (error) {
        console.error('❌ Error al enviar el correo:', error);
        throw new Error('No se pudo enviar el correo.');
    }
};
