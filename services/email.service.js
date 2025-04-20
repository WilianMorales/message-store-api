import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,   // Tu email
        pass: process.env.SMTP_PASS    // Tu contraseña o app password
    }
});

export const sendEmail = async ({ nombre, email, mensaje }) => {
    if (!nombre || !email || !mensaje) {
        throw new Error('Nombre, email y mensaje son requeridos para enviar el correo.');
    }

    const mailOptions = {
        from: `"${nombre}" <${email}>`,
        to: process.env.RECEIVER_EMAIL, // A donde quieres recibir el mensaje
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
