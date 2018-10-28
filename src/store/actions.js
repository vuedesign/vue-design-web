/**
 * Created by wujian on 2018/9/24.
 */
// import Vue from 'vue';
// import { router, store } from '@/vued';

export const findMenu = ({ commit }, isThree) => {
    return new Promise((resolve, reject) => {
        const data = require('@/configs/menu.json');
        if (isThree) {
            commit('HEADER_MENU', data);
            commit('HEADER_MENU_ACTIVE', data[0].name);
            commit('ASIDE_MENU', data[0].children);
        } else {
            commit('ASIDE_MENU', data);
        }
        commit('MENU', data);
    });
};
