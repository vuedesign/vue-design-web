import { createStore, createLogger } from 'vuex';
import modules from '../configs/modules';
// import indexDb from '../modules/globals/plugins/indexDb';
// import Dexie from 'dexie';
import localStore from '../modules/globals/plugins/localStore';
import ls from './localStore';

const debug = process.env.NODE_ENV !== 'production';

const plugins = [];

if (debug) {
    plugins.push(createLogger());
}

plugins.push(localStore(ls));

export default createStore({
    modules,
    strict: debug,
    plugins
});
