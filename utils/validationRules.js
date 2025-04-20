import { body, validationResult } from 'express-validator';

export const validateContactForm = [
    body('nombre')
        .notEmpty().withMessage('Nombre requerido')
        .trim().escape(),

    body('email')
        .isEmail().withMessage('Debe proporcionar un email válido')
        .normalizeEmail(),

    body('mensaje')
        .notEmpty().withMessage('El mensaje no puede estar vacío')
        .trim().escape(),

    body('recaptchaToken')
        .notEmpty().withMessage('El token de reCAPTCHA es obligatorio'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({
                campo: err.param,
                mensaje: err.msg
            }));
            return res.status(400).json({ errores: formattedErrors });
        }
        next();
    }
];
