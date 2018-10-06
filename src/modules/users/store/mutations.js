/**
 * Created by wujian on 2018/3/18.
 */

import {
    USER_DATA,
    USER_FILTERS,
    USERS_DATA,
    USERS_TOTAL
} from './types';

export default {
    [USER_DATA](state, { key, value }) {
        state.user[key] = value;
    },
    [USER_FILTERS](state, filters) {
        state.user.filters = Object.assign(state.user.filters, filters);
    },
    [USERS_DATA](state, data) {
        state.user.data = data;
    },
    [USERS_TOTAL](state, data) {
        state.user.total = data;
    }
};
