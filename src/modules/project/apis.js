import { http } from 'vue-design-core';

export const findData = (query) => http.get('/api/web/projects', { params: query });
