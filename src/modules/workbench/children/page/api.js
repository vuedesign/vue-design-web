import { http } from '@/core';

// 分类
export function findCategoryData(params = {}) {
    return http.get('/api/v1/categorys', { params });
}

export function findOneCategoryData(id) {
    return http.get(`/api/v1/categorys/${id}`);
}

export function updateFieldCategoryData(id, data) {
    return http.patch(`/api/v1/categorys/${id}`, data);
}

export function createCategoryData(data) {
    return http.post(`/api/v1/categorys`, data);
}

export function updateCategoryData(data) {
    return http.put(`/api/v1/categorys/${data.id}`, data);
}

export function destroyCategoryData(id) {
    return http.delete(`/api/v1/categorys/${id}`);
}

// 页面
export function findData(params = {}) {
    return http.get('/api/v1/pages', { params });
}

export function findOneData(id) {
    return http.get(`/api/v1/pages/${id}`);
}

export function updateFieldData(id, data) {
    return http.patch(`/api/v1/pages/${id}`, data);
}

export function createData(data) {
    return http.post(`/api/v1/pages`, data);
}

export function updateData(data) {
    return http.put(`/api/v1/pages/${data.id}`, data);
}

export function destroyData(id) {
    return http.delete(`/api/v1/pages/${id}`);
}
