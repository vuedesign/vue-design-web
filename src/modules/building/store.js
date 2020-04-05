/**
 * Created by wujian on 2018/3/18.
 */

import folder from './children/folder/store';
import module from './children/module/store';
import page from './children/page/store';

export default {
    namespaced: true,
    state: {
        selectIcon: ''
    },
    getters: {
        selectIcon: state => state.selectIcon
    },
    mutations: {
        SELECT_ICON(state, selectIcon) {
            state.selectIcon = selectIcon;
        }
    },
    modules: {
        folder,
        module,
        page
    }
};
