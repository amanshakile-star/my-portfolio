import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { adminLogin as apiAdminLogin } from '../lib/api';

interface AuthContextType {
  token: string | null;
  admin: AdminUser | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('portfolio_admin_token') || null;
  });
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('portfolio_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (credentials: { email: string; password: string }) => {
    const data = await apiAdminLogin(credentials);
    setToken(data.token);
    setAdmin(data.admin);
    localStorage.setItem('portfolio_admin_token', data.token);
    localStorage.setItem('portfolio_admin_user', JSON.stringify(data.admin));
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        admin,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
