import Vue from 'vue';
import utils from '../plugins/utils';

export default function(constants) {
    Vue.use(utils, constants);
};
