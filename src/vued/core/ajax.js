/**
 * Created by wujian on 2018/3/25.
 */
import Vue from 'vue';
import ajax from '../plugins/ajax';

export default function(options = {}) {
    Vue.use(ajax, options);
};
