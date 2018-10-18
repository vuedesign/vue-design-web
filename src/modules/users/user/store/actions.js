/**
 * Created by wujian on 2018/3/18.
 */
import Vue from 'vue';
import * as types from './types';

export const find = ({ commit }) => {
    const url = Vue.getAPI('USERS');
    console.log('getUserData : USERS : ', url);
    // const url = '';
    Vue.ajax.get(url).then(res => {
        commit(types.DATA, res.data);
        commit(types.TOTAL, res.total);
    });
};
