/**
 * Created by wujian on 2018/3/18.
 */
// import Vue from 'vue';
import * as types from './types';
import * as api from '../api';
import { to } from '@/vued';

export const find = async({ commit, getters }) => {
    const params = getters.filters;
    const [err, res] = await to(api.find(params));
    if (err) {
        return;
    }
    commit(types.DATA, res.data);
    commit(types.TOTAL, res.pagination.total);
};

export const findOne = async({ commit }, params) => {
    const [err, res] = await to(api.findById(params));
    if (err) {
        return;
    }
    commit(types.DATA, res.data);
};
