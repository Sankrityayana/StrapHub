import api from './api.js';

export const me = async () => api.get('/api/me');
export const completeLesson = async (id) => (await api.post(`/api/progress/lessons/${id}`)).data;
export const uncompleteLesson = async (id) => (await api.delete(`/api/progress/lessons/${id}`)).data;
export const completeProject = async (id) => (await api.post(`/api/progress/projects/${id}`)).data;
export const uncompleteProject = async (id) => (await api.delete(`/api/progress/projects/${id}`)).data;
