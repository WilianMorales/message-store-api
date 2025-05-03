# ✉️ MessageStore-API - Anti-Spam Ready (Backend)

Este proyecto es una API para recibir mensajes de contacto desde un portafolio web construido en Angular. Incluye validación de datos, protección anti-spam con Google reCAPTCHA v3, envío de correos con Nodemailer y almacenamiento en Supabase.

## 🚀 Tecnologías

- Node.js + Express
- Nodemailer (correo vía SMTP)
- Google reCAPTCHA v3
- Supabase (como base de datos)
- Railway (deploy backend)

## 🛡️ Características

- Validación robusta del formulario (nombre, email, mensaje)
- Protección anti-bots con reCAPTCHA v3
- Envío de correo al recibir mensajes
- Guardado de mensajes en Supabase
- Middleware para validación y control de errores
- CORS configurado para aceptar solo tu frontend
- Rate limiting con express-rate-limit para evitar abuso

## 🧪 Endpoints

### POST `/api/contact`

Envía un mensaje desde el formulario de contacto.

#### Request body:

```json
{
  "nombre": "Tu Nombre",
  "email": "correo@example.com",
  "mensaje": "Este es mi mensaje",
  "recaptchaToken": "token-generado-por-recaptcha-v3"
}
```

> 🌐 El backend está desplegado en Railway.

## 🧭 Configuración .env

```env
PORT=3000

# SMTP Config
SMTP_USER=usuario@correo.com
SMTP_PASS=tu_contraseña

# Correo destino (puede ser el mismo o diferente)
RECEIVER_EMAIL=Remitente<usuario@correo.com>

# reCAPTCHA v3
RECAPTCHA_SECRET_KEY=tu_clave_secreta_de_recaptcha

# Superbase
SUPABASE_URL=https://tuinstancia.supabase.co
SUPABASE_KEY=clave_service_role_supabase
```

## Implemented Dependencies:
* Nodemon
```
npm install -g nodemon
```
* Instalamos las librerías necesarias en un solo comando
```
npm install express cors express-validator nodemailer dotenv
```
* Express-rate-limit
```
npm install express-rate-limit
```
* Supabase
```
npm install @supabase/supabase-js
```

## Ejecutamos nuestro backend con el siguiente comando:
`npm start` o `npm run dev` para desarrollo.