export const authService = {
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login logic
    if (email === 'admin@ahadu.com' && password === 'admin123') {
      return {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@ahadu.com',
        role: 'admin'
      };
    } else if (email === 'user@example.com' && password === 'user123') {
      return {
        id: 'user-1',
        name: 'Regular User',
        email: 'user@example.com',
        role: 'user'
      };
    }
    
    throw new Error('Invalid email or password');
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      ...userData,
      id: Math.random().toString(36).substring(2, 11),
      role: 'user'
    };
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
};
