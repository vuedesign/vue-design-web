/**
 * Created by wujian on 2018/9/24.
 */
import Vue from 'vue';
export const getConstants = (store) => {
    let url = Vue.getAPI('DETAIL', {
        detail: 'name',
        page: 1
    });
    console.log('state.constants', url);
};

export const getUserName = (store) => {
    let url = Vue.getAPI('USERS');
    console.log('getUserName', url);
};
