/**
 * Created by wujian on 2018/3/18.
 */
// import Vue from 'vue';
import * as types from './types';
import * as api from '../api';
import { REQ_SUCCESS_STATUS_CODE } from '@/configs/constants';

export const find = async({ commit, getters }) => {
    const params = getters.filters;
    commit(types.LOADING, true);
    const [err, res] = await api.find(params);
    if (err) {
        return;
    }
    console.log('res', res);
    commit(types.LIST, res.list);
    commit(types.TOTAL, res.pagination.total);
    commit(types.LOADING, false);
};

export const findOne = async({ commit }, id) => {
    const [err, res] = await api.findOne(id);
    if (err) {
        return;
    }
    commit(types.ITEM, res.data);
};

export const create = async({ dispatch }, data = {}) => {
    const [err, res] = await api.create(data);
    if (err) {
        return;
    }
    if (res.code === REQ_SUCCESS_STATUS_CODE) {
        dispatch('find');
    }
};

export const update = async({ dispatch }, data = {}) => {
    const { id } = data;
    delete data.id;
    const [err, res] = await api.update(id, data);
    if (err) {
        return;
    }
    if (res.code === REQ_SUCCESS_STATUS_CODE) {
        dispatch('find');
    }
};

export const destroy = async({ dispatch }, id) => {
    const [err, res] = await api.destroy(id);
    if (err) {
        return;
    }
    if (res.code === REQ_SUCCESS_STATUS_CODE) {
        dispatch('find');
    }
};

export const updateOne = async({ dispatch }, data) => {
    const { id } = data;
    delete data.id;
    const [err, res] = await api.updateOne(id, data);
    if (err) {
        return;
    }
    if (res.code === REQ_SUCCESS_STATUS_CODE) {
        dispatch('find');
    }
};
