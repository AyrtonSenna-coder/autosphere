import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (for demo purposes)
    const token = localStorage.getItem('token');
    if (token) {
      // Simple demo user - in real app, you'd verify the token with your backend
      setUser({ 
        id: '1', 
        name: 'Demo User', 
        email: 'demo@autosphere.com',
        role: 'customer'
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Demo login - in real app, this would call your backend
    if (email && password) {
      const userData = {
        id: '1',
        name: 'Demo User',
        email: email,
        role: 'customer'
      };
      setUser(userData);
      localStorage.setItem('token', 'demo-token');
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (userData) => {
    // Demo registration - in real app, this would call your backend
    const newUser = {
      id: '2',
      name: userData.name,
      email: userData.email,
      role: 'customer'
    };
    setUser(newUser);
    localStorage.setItem('token', 'demo-token');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};