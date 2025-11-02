import api from './api.js';

export const loginApi = async (email, password) => {
  const { data } = await api.post('/api/auth/login', { email, password });
  return data;
};

export const registerApi = async (name, email, password) => {
  const { data } = await api.post('/api/auth/register', { name, email, password });
  return data;
};
