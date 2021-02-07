import { http } from '@core';

export function findData() {
    return http.get('/api/v1/projects');
}

export function findOneData(id) {
    return http.get(`/api/v1/projects/${id}`);
}
