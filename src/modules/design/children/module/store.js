/**
 * Created by wujian on 2020/3/18.
 */
import * as apis from './apis';
import { Message } from 'element-ui';
import { list2tree } from '@vendors/utils';

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

function fileMap2children(list) {
    return list.map(item => {
        if (!item.children) {
            item['children'] = [];
        }  else {
            item['children'] = fileMap2children(item.children);
        }
        if (item.fileMap && item.fileMap.length) {
            item.fileMap.forEach(fmi => {
                item.children.push(fmi);
            });
        }
        return item;
    });
}

const getters = {
    list: state => state.list,
    listTree: state => {
        console.log('state.list', state.list);
        if (!state.list.length) {
            return [];
        }
        // 为模块加上类型，以区分file、filoder、module
        state.list = state.list.map(item => {
            item.type = 'module';
            return item;
        });
        const list = list2tree(state.list);
        return fileMap2children(list);
    },
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
