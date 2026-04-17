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
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const register = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Create profile entry
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, full_name: fullName, role: 'customer' }]);
      
      if (profileError) console.error('Error creating profile:', profileError.message);
    }

    return data;
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
    try {
      const { error } = await supabase.auth.updateUser(data);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error updating auth user:', error.message);
      return { success: false, error: error.message };
    }
  };

  const isAdmin = profile?.role === 'admin';

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
