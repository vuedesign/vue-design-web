import { findProfileData, loginData } from './api';
import { router, http } from '@core';

const TOKEN_KEY = 'DESIGN_TOKEN';

const state = {
    profile: {}
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
    }
};

const mutations = {
    SET_TOKEN(state, token) {
        window.localStorage.setItem(TOKEN_KEY, token);
    },
    PROFILE(state, profile) {
        state.profile = profile;
    }
};

const getters = {
    token: () => {
        const token = window.localStorage.getItem(TOKEN_KEY);
        return token || '';
    },
    profile: state => state.profile
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
