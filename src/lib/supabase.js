import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

/**
 * Diagnostic tool to check if the Supabase connection is established.
 * You can call this in your main entry point to verify the setup.
 */
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('products').select('id').limit(1);
    
    if (error) {
      if (error.message.includes('FetchError') || error.message.includes('failed to fetch')) {
        console.error('❌ Supabase Connection Failed: Could not reach the server. Check your URL.');
      } else {
        console.warn('⚠️ Supabase Connected, but "products" table check failed:', error.message);
        console.info('Tip: Ensure you have created the "products" table in your Supabase dashboard.');
      }
      return false;
    }
    
    console.log('✅ Supabase Connection: SUCCESS. Catalog synchronization active.');
    return true;
  } catch (err) {
    console.error('❌ Supabase Connection: CRITICAL ERROR', err);
    return false;
  }
};
