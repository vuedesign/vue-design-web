/**
 * Created by wujian on 2018/3/18.
 */
import folder from './children/folder/routes';
import module from './children/module/routes';
import page from './children/page/routes';

export default {
    path: 'buiding',
    name: 'buiding',
    meta: {
        label: '生成器'
    },
    component: () => import('./pages/Index'),
    redirect: { name: 'building-module' },
    children: [
        ...folder,
        ...module,
        ...page
    ]
};
