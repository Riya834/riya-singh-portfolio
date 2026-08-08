import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('riya_admin_token') || null);

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await portfolioAPI.getAdminMe();
        if (res.success) {
          setAdmin(res.data);
        } else {
          logout();
        }
      } catch (err) {
        console.error('Auth verify error:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await portfolioAPI.adminLogin({ email, password });
      if (res.success && res.data.token) {
        localStorage.setItem('riya_admin_token', res.data.token);
        setToken(res.data.token);
        setAdmin(res.data);
        return { success: true };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('riya_admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
