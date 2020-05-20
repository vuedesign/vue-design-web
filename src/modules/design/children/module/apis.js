import { http } from 'vue-design-core';

export const findData = (query) => http.get('/api/web/modules', { params: query });

export const findOneData = (params) => http.get(`/api/web/modules/${params.uuid}`);

export const createData = (data = {}) => http.post('/api/web/modules', data);

export const editData = (data = {}) => http.put(`/api/web/modules/${data.uuid}`, data);

export const checkData = (data = {}) => http.post(`/api/web/modules/check`, data);

export const destroyData = (params = {}) => http.delete(`/api/web/modules/${params.uuid}`);
