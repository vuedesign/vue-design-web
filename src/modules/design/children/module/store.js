/**
 * Created by wujian on 2018/3/18.
 */
import * as apis from './apis';
import { Message } from 'element-ui';

const state = {
    filter: {},
    list: [],
    detail: {},
    total: 0
};

const actions = {
    find: async({ commit, getters }) => {
        const res = await apis.findData(getters.filter);
        commit('LIST', res.rows);
        commit('TOTAL', res.count);
    },
    findOne: async({ commit }, uuid) => {
        const res = await apis.findOneData({ uuid });
        commit('DETAIL', res);
    },
    add: async({ dispatch }, formData) => {
        await apis.createData(formData);
        await dispatch('find');
        Message.success('模块创建成功！');
    },
    edit: async({ dispatch }, formData) => {
        await apis.editData(formData);
        await dispatch('find');
        Message.success('模块编辑成功！');
    },
    check: (store, { field, value, uuid }) => {
        return apis.checkData({ field, value, uuid });
    },
    destroy: async({ dispatch }, { uuid }) => {
        await apis.destroyData({ uuid });
        await dispatch('find');
        Message.success('模块删除成功！');
    }
};

const mutations = {
    LIST(state, payload) {
        state.list = payload;
    },
    FILTER(state, payload) {
        state.filter = payload;
    },
    TOTAL(state, payload) {
        state.total = payload;
    },
    DETAIL(state, payload) {
        state.detail = payload;
    }
};

const getters = {
    list: state => state.list,
    detail: state => state.detail,
    filter: state => state.filter,
    total: state => state.total
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
