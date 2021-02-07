import { createStore, createLogger } from 'vuex';
import modules from '../configs/modules';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
    modules,
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
