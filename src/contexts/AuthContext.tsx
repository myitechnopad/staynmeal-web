import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';


interface AuthContextType {
  accessToken: string | null;
  user: any | null;
  setAccessToken: (token: string | null) => void;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (token: string) => void;
  logout: () => void;  
}


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const TOKEN_KEY = 'access_token';
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem('access_token'));
  const [user, setUser] = useState<any | null>(null);
  //const isAuthenticated = !!accessToken && !!user;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        console.log('Decoded:', decoded);
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Invalid token', err);
        setUser(null);
      }
    } else {
      setIsAuthLoading(false);
      setUser(null);
    }
    setIsAuthLoading(false); // ✅ Always end loading, regardless of outcome
  }, [accessToken]);
  const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setAccessToken(token); // Triggers re-render
    setIsAuthenticated(true);
    setIsAuthLoading(false);
  };

  const logout = async () => {
    try {
      await api.post('/token/logout'); // Optional
      localStorage.removeItem(TOKEN_KEY);
      setAccessToken(null); // Triggers re-render
      console.log('Logout successful');

    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setAccessToken(null); // Triggers re-render
      setIsAuthenticated(false);
      setUser(null);
      console.error("Logout: finally block executed");

    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, setAccessToken, isAuthenticated, isAuthLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
