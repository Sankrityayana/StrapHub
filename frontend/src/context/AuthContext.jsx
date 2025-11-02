import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginApi, registerApi } from '../services/auth.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('bl_auth');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user);
      setToken(parsed.token);
    }
  }, []);

  const saveAuth = (payload) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem('bl_auth', JSON.stringify(payload));
  };

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    saveAuth(data);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await registerApi(name, email, password);
    saveAuth(data);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('bl_auth');
  };

  const refreshMe = async () => {
    try {
      const { data } = await (await import('../services/user.js')).me();
      const updated = { user: data, token };
      localStorage.setItem('bl_auth', JSON.stringify(updated));
      setUser(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const setProgress = (progress) => {
    const updatedUser = { ...(user || {}), progress };
    setUser(updatedUser);
    localStorage.setItem('bl_auth', JSON.stringify({ user: updatedUser, token }));
  };

  const value = useMemo(() => ({ user, token, login, register, logout, refreshMe, setProgress }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
