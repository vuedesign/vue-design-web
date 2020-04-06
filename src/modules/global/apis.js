import { http } from 'vue-design-core';

const API_URL = '/api';

export const userinfoData = params => http.get(`${API_URL}/userinfo`, { params });
