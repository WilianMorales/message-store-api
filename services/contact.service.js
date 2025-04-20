import { supabase } from '../config/supabase.js';

export const saveContactMessage = async ({ nombre, email, mensaje }) => {
    // Validación de los datos de entrada
    if (!nombre || !email || !mensaje) {
        throw new Error('Nombre, email y mensaje son obligatorios.');
    }

    // Insertar el mensaje en la base de datos
    const { data, error } = await supabase
        .from('contact_messages')
        .insert([{ nombre, email, mensaje }])
        .select();

    if (error) {
        console.error('❌ Error al insertar en Supabase:', error);
        throw new Error(`Error al guardar mensaje: ${error.message}`);
    }

    // Log en desarrollo
    if (process.env.NODE_ENV !== 'production') {
        console.log('✅ Mensaje guardado:', data);
    }

    return data;
};
