import { findProfileData, loginData, findTagData } from './api';
import { router, http } from '@/core';

const TOKEN_KEY = 'DESIGN_TOKEN';

const state = {
    profile: {},
    tag: {
        list: [],
        filter: {},
        total: 0
    }
};

const actions = {
    findProfile: async({ commit }) => {
        const res = await findProfileData();
        commit('PROFILE', res);
        console.log('findProfile', res);
    },
    login: async({ commit }, formData) => {
        const res = await loginData(formData);
        console.log('login', res);
        commit('SET_TOKEN', res.token);
        http.setAuthorization(`Bearer ${res.token}`);
        router.push({
            name: 'project'
        });
    },
    findTag: async({ commit }) => {
        const res = await findTagData();
        commit('TAG_LIST', res.list);
        commit('TAG_TOTAL', res.total);
        console.log('findTag', res);
    }
};

const mutations = {
    SET_TOKEN(state, token) {
        window.localStorage.setItem(TOKEN_KEY, token);
    },
    PROFILE(state, profile) {
        state.profile = profile;
    },
    TAG_LIST(state, tagList) {
        state.tag.list = tagList;
    },
    TAG_TOTAL(state, tagTotal) {
        state.tag.total = tagTotal;
    }
};

const getters = {
    token: () => {
        const token = window.localStorage.getItem(TOKEN_KEY);
        return token || '';
    },
    profile: state => state.profile,
    tagList: state => state.tag.list,
    tagTotal: state => state.tag.total
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
