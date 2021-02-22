import { findData, findOneData, updateFielData } from './api';

const state = {
    detail: {
        id: 0,
        name: '',
        description: ''
    },
    list: [],
    filter: {
        page: 1,
        size: 7,
        order: 'updatedAt DESC',
        tagId: 0
    },
    total: 0
};

const mutations = {
    LIST(state, list) {
        state.list = list;
    },
    TOTAL(state, total) {
        state.total = total;
    },
    DETAIL(state, detail) {
        state.detail = detail;
    },
    FILTER(state, filter) {
        Object.assign(state.filter, filter);
    },
    UPDATE_ACTIVCE_STATE(state, { id, active }) {
        state.list.forEach(item => {
            if (item.id === id) {
                item.active = active;
            } else {
                item.active = false;
            }
        });
        console.log('state.list', state.list);
    }
};

const actions = {
    find: async({ commit, getters }, query) => {
        commit('FILTER', query);
        const res = await findData(getters.filter);
        const list = res.list.map(item => {
            return {
                ...item,
                active: false
            };
        });
        console.log('res', res, list);
        commit('LIST', list);
        commit('TOTAL', res.total);
    },
    findOne: async({ commit }, id) => {
        const res = await findOneData(id);
        commit('DETAIL', res);
    },
    updateField: async({ dispatch }, { id, field, value, type }) => {
        const res = await updateFielData(id, {
            field,
            value,
            type
        });
        await dispatch('find');
        console.log('res', res);
    }
};

const getters = {
    detail: state => state.detail,
    list: state => state.list,
    total: state => state.total,
    filter: state => state.filter
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
