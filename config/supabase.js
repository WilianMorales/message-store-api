import { createClient } from '@supabase/supabase-js';

import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validación de las variables de entorno
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Faltan variables de entorno: SUPABASE_URL o SUPABASE_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const testConnection = async () => {
    try {
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .limit(1); // Solo recupera un mensaje para verificar

        if (error) {
            console.error('Error al conectarse a Supabase:', error.message);
            throw new Error('Error al conectarse a Supabase: ' + error.message);
        }

        console.log(`Conexión a Supabase exitosa, recuperados ${data.length} registros`);
    } catch (err) {
        console.error('Error en testConnection:', err.message);
        throw err; // Re-lanzar el error para que pueda ser manejado externamente
    }
};
