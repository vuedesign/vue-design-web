/**
 * Created by wujian on 2018/3/18.
 */

export default {
    path: 'design/:uuid',
    name: 'project-design',
    meta: {
        label: '设计面板'
    },
    component: () => import('./pages/Index'),
    children: [
    ]
};
