/**
 * Created by wujian on 2018/3/18.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default function(options = {}) {
    return new Vuex.Store(options);
}
