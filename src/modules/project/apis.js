import { http } from 'vue-design-core';

export const findData = (query) => http.get('/api/web/projects', { params: query });

export const findOneData = (params) => http.get(`/api/web/projects/${params.uuid}`);

export const createData = (data = {}) => http.post('/api/web/projects', data);

export const editData = (data = {}) => http.put(`/api/web/projects/${data.uuid}`, data);

export const checkData = (data = {}) => http.post(`/api/web/projects/check`, data);

export const destroyData = (params = {}) => http.delete(`/api/web/projects/${params.uuid}`);
