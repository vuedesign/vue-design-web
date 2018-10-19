import Vue from 'vue';

const API = '/api/v1/group';

export const find = params => {
    return Vue.ajax.get(API, { params });
};

export const findById = (params = {}) => {
    const { groupId } = params;
    delete params.groupId;
    return Vue.ajax.get(`${API}/${groupId}`, { params });
};

export const update = (data = {}, params = {}) => {
    const { groupId } = params;
    delete params.groupId;
    return Vue.ajax.put(`${API}/${groupId}`, data, { params });
};

export const create = (data = {}, params = {}) => {
    return Vue.ajax.post(API, data, { params });
};

export const destroy = (params = {}) => {
    const { groupId } = params;
    delete params.groupId;
    return Vue.ajax.delete(`${API}/${groupId}`);
};
