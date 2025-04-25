import { supabase } from '../config/supabase.js';

export const saveContactMessage = async ({ nombre, email, mensaje, ip, userAgent }) => {
    try {
        // Insertar el mensaje en la base de datos
        const { data, error } = await supabase
            .from('contact_messages')
            .insert([{
                nombre,
                email,
                mensaje,
                ip_address: ip,
                user_agent: userAgent
            }])
            .select();

        if (error) {
            console.error('❌ Error al insertar en Supabase:', error);
            return { success: false, message: error.message, data: null }
        }

        return { success: true, message: 'Mensaje guardado correctamente.', data };
    } catch (err) {
        console.error('❌ Error inesperado al guardar mensaje:', err);
        return { success: false, message: err.message, data: null }
    }
};
