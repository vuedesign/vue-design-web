/**
 * Created by wujian on 2018/3/18.
 */
import folder from './folder/routes';
import module from './module/routes';
import pages from './pages/routes';

export default {
    path: 'generator',
    name: 'generator',
    meta: {
        label: '生成器'
    },
    component: () => import('./Index'),
    redirect: 'generator/module',
    children: [
        ...folder,
        ...module,
        ...pages
    ]
};
