import { http } from '@core';

export function findData(params = {}) {
    return http.get('/api/v1/projects', { params });
}

export function findOneData(id) {
    return http.get(`/api/v1/projects/${id}`);
}
