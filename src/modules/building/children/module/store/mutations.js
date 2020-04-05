/**
 * Created by wujian on 2018/3/18.
 */

import {
    FILTERS,
    LIST,
    ITEM,
    TOTAL,
    LOADING,
    TABLE_ITEM,
    TABLE_LIST
} from './types';

export default {
    [LIST](state, { key, value }) {
        state[key] = value;
    },
    [FILTERS](state, filters) {
        state.filters = Object.assign(state.filters, filters);
    },
    [LIST](state, list) {
        state.list = list;
    },
    [ITEM](state, item) {
        state.item = item;
    },
    [TOTAL](state, total) {
        state.total = total;
    },
    [LOADING](state, loading) {
        state.loading = loading;
    },
    [TABLE_ITEM](state, tableItem) {
        state.tableItem = tableItem;
    },
    [TABLE_LIST](state, tableList) {
        state.tableList = tableList;
    }
};
