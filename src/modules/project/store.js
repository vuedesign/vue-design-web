/**
 * Created by wujian on 2018/3/18.
 */
import * as apis from './apis';
import { Message } from 'element-ui';
import { waiting } from '@vendors/utils';
import { router } from 'vue-design-core';

const state = {
    filter: {},
    list: [],
    detail: {},
    total: 0,
    selectIcon: '',
    currentBlob: null
};

const actions = {
    find: async({ commit, getters }) => {
        const res = await apis.findData(getters.filter);
        commit('LIST', res.rows);
        commit('TOTAL', res.count);
        console.log('project find:', res);
    },
    findOne: async({ commit }, uuid) => {
        const res = await apis.findOneData({ uuid });
        commit('DETAIL', res);
    },
    add: async(store, formData) => {
        await apis.createData(formData);
        Message.success('项目创建成功！');
        await waiting();
        router.push({
            name: 'project'
        });
    },
    edit: async(store, formData) => {
        await apis.editData(formData);
        Message.success('项目编辑成功！');
        await waiting();
        router.push({
            name: 'project'
        });
    },
    check: async(store, { field, value, uuid }) => {
        const res = await apis.checkData({ field, value, uuid });
        return res;
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
    },
    CURRENT_BLOB(state, payload) {
        state.currentBlob = payload;
    }
};

const getters = {
    list: state => state.list,
    detail: state => state.detail,
    filter: state => state.filter,
    total: state => state.total,
    currentBlob: state => state.currentBlob
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
