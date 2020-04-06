/**
 * Created by n.see on 2020/04/06.
 */
import * as apis from './apis';
import { router } from 'vue-design-core';
import { Message } from 'element-ui';

const state = {};

const actions = {
    register: async(store, fromData) => {
        const res = await apis.registerData(fromData);
        if (res) {
            router.push({
                name: 'auth-login'
            });
        }
        console.log('res', res);
    },
    login: async({ commit }, fromData) => {
        const res = await apis.loginData(fromData);
        console.log('res', res);
        commit('global/TOKEN', res.token, {
            root: true
        });
        if (res) {
            router.push({
                path: '/'
            });
        }
        console.log('res', res);
    },
    logout: async() => {
        await apis.logoutData();
        Message(`退出登录`);
        router.push({
            name: 'auth-login'
        });
    } 
};

const mutations = {};

const getters = {};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
