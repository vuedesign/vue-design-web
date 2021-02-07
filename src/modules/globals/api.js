import { http } from '@core';

export function findProfileData() {
    return http.get('/api/v1/auth/profile');
}

export function loginData(data) {
    return http.post('/api/v1/auth/login', data);
}
