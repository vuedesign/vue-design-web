/**
 * Created by wujian on 2018/9/24.
 */
// import Vue from 'vue';
// import { router, store } from '@/vued';
import { array2Tree } from '@/vendor/utils';

export const findMenu = ({ commit }, isThree = false) => {
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

export const permission = ({ commit }, isThree = false) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = require('@/configs/permission.json');
            // commit('PERMISSION', data);
            const menuData = array2Tree(data);
            if (isThree) {
                commit('HEADER_MENU', menuData);
                commit('HEADER_MENU_ACTIVE', menuData[0].name);
                commit('ASIDE_MENU', menuData[0].children);
            } else {
                commit('ASIDE_MENU', menuData);
            }
            commit('MENU', menuData);
        }, 100);
    });
};
