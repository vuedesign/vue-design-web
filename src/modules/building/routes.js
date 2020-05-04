/**
 * Created by wujian on 2018/3/18.
 */

export default {
    path: 'buiding',
    name: 'buiding',
    meta: {
        label: '生成器'
    },
    component: () => import('./pages/Index'),
    redirect: { name: 'building-module' },
    children: [
    ]
};
