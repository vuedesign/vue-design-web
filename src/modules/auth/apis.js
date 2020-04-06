import { http } from 'vue-design-core';

const API_URL = '/api';

export const registerData = data => http.post(`${API_URL}/register`, data);

export const loginData = data => http.put(`${API_URL}/login`, data);

export const logoutData = () => http.get(`${API_URL}/logout`);
