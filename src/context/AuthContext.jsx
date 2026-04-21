import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

/**
 * AHADU IDENTITY PROVIDER (CONTEXT)
 * 
 * The central security hub of the application. 
 * Responsibilities:
 * 1. Synchronize Auth Session with Supabase Cloud
 * 2. Maintain Real-time Profile state
 * 3. Provide Role-Based Access Control (RBAC) signals like 'isAdmin'
 */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial State Hydration: Check for existing cookies/sessions
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    };

    getSession();

    // 2. Real-time Subscription: React to Login/Logout events across tabs
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // HYDRATION: Fetches extended metadata from the Profiles table
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      
      // AUTO-PROMOTION: If email matches admin but role is customer, upgrade them
      const ADMIN_EMAIL = 'merchanttradingplc@gmail.com';
      if (data.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && data.role !== 'admin') {
        console.log('🛡️ System Auth: Auto-promoting Master Admin...');
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', userId);
        
        if (!updateError) {
          data.role = 'admin';
        }
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const cleanEmail = String(email || '').trim();
    const cleanPassword = String(password || '');

    console.log('🔐 System Auth: Initiating Login Protocol...', { email: cleanEmail });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });
      if (error) {
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Access Denied: Please verify your email address to continue. Check your inbox for the confirmation link.');
        }
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Verification Failed: The email or password provided is incorrect.');
        }
        throw error;
      }
      return data;
    } catch (error) {
      console.error('❌ Auth Error:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    console.log('🔐 System Auth: Terminating Session...');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const register = async (email, password, fullName) => {
    const cleanEmail = String(email || '').trim();
    const cleanPassword = String(password || '');
    const cleanFullName = String(fullName || '').trim();

    console.log('🔐 System Auth: Registering New Stakeholder...', { 
      email: cleanEmail, 
      fullName: cleanFullName 
    });

    if (cleanPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long for security.');
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: cleanPassword,
        options: {
          data: {
            full_name: cleanFullName,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        console.log('✅ System Auth: Identity created. Syncing profile...');
        
        // ADMIN BOOTSTRAP: Automatically grant admin role to the primary stakeholder email
        const ADMIN_EMAIL = 'merchanttradingplc@gmail.com';
        const assignedRole = cleanEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'customer';

        // Create profile entry in the public.profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ 
            id: data.user.id, 
            full_name: cleanFullName, 
            email: cleanEmail,
            role: assignedRole 
          }]);
        
        if (profileError) {
          console.warn('⚠️ System Auth: Profile sync delayed (Check RLS):', profileError.message);
        } else {
          console.log('✅ System Auth: Profile synchronized successfully.');
        }
      }

      return data;
    } catch (error) {
      console.error('❌ Registration Error:', error.message);
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
      setProfile({ ...profile, ...updates });
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error.message);
      return { success: false, error: error.message };
    }
  };

  const updateUser = async (data) => {
    console.log('🔐 System Auth: Updating Identity Protocol...');
    try {
      const { error } = await supabase.auth.updateUser(data);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('❌ User Update Error:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Identity calculation
  const isAdmin = profile?.role === 'admin';

  console.log('🛡️ System Auth: Current Security Signal:', { 
    authenticated: !!user, 
    role: profile?.role || 'anonymous',
    isAdmin 
  });

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      login, 
      logout, 
      register, 
      updateProfile,
      updateUser,
      loading, 
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
