/**
 * Created by wujian on 2018/3/18.
 */
import Vue from 'vue';
import * as types from './types';

const getUserData = ({ commit }) => {
    const url = Vue.getAPI('USERS');
    console.log('getUserData : USERS : ', url);
    // const url = '';
    Vue.ajax.get(url).then(res => {
        commit(types.USERS_DATA, res.data);
        commit(types.USERS_TOTAL, res.total);
    });
};

export default {
    getUserData
};
