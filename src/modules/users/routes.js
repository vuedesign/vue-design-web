/**
 * Created by wujian on 2018/3/18.
 */

export default {
    path: 'users',
    name: 'users',
    meta: {
        label: '用户中心'
    },
    component: () => import('@/modules/users/Index'),
    redirect: 'users/user',
    children: [
        {
            path: 'user',
            name: 'user',
            meta: {
                label: '用户'
            },
            component: () => import('@/modules/users/User')
        },
        {
            path: 'group',
            name: 'group',
            meta: {
                label: '用户组'
            },
            component: () => import('@/modules/users/Group')
        }
    ]
};
