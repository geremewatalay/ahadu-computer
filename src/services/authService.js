import { supabase } from '../lib/supabase';

/**
 * AHADU IDENTITY SERVICE
 * 
 * Manages user authentication cycles and profile synchronization.
 * Integrates directly with Supabase Auth (GoTrue) and the 'profiles' metadata table.
 */
export const authService = {
  // ATTEMPT authentication and retrieve linked profile data
  login: async (email, password) => {
    const cleanEmail = String(email || '').trim();
    const cleanPassword = String(password || '');

    console.log('🔗 authService: Initiating Login...', { email: cleanEmail });
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword,
    });

    if (error) throw error;

    // Fetch the extended user metadata from the public profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      console.warn('⚠️ authService: Profile sync failed:', profileError.message);
    }

    return {
      id: data.user.id,
      email: data.user.email,
      ...profile
    };
  },

  // CREATE a new system identity and initialize the profile entry
  register: async (email, password, fullName) => {
    // DIAGNOSTIC CORE: Verify data integrity before transmission
    const cleanEmail = String(email || '').trim();
    const cleanPassword = String(password || '');
    const cleanFullName = String(fullName || '').trim();

    console.log('🔗 authService: Initiating Registration...', { 
      email: cleanEmail, 
      fullName: cleanFullName,
      payloadTypes: {
        email: typeof cleanEmail,
        password: typeof cleanPassword,
        fullName: typeof cleanFullName
      }
    });

    if (cleanPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: cleanPassword,
      options: {
        data: {
          full_name: cleanFullName
        }
      }
    });

    if (error) {
      console.error('❌ authService: Supabase Auth rejection:', error.message);
      throw error;
    }

    if (data.user) {
      console.log('✅ authService: Auth User Created. ID:', data.user.id);
      // Initialize the public profile record linked to the Auth UUID
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ 
          id: data.user.id, 
          full_name: cleanFullName, 
          email: cleanEmail,
          role: 'customer' 
        }]);
      
      if (profileError) {
        console.warn('⚠️ authService: Profile creation failed (Check RLS Policies):', profileError.message);
      } else {
        console.log('✅ authService: Profile record synchronized.');
      }
    }

    return data;
  },

  // DESTROY current session and clear tokens
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  }
};
