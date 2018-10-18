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
            name: 'users-user',
            meta: {
                label: '用户'
            },
            component: () => import('@/modules/users/user/List'),
            children: [
                {
                    path: 'create',
                    name: 'users-user-create',
                    meta: {
                        label: '创建用户'
                    },
                    component: () => import('@/modules/users/user/Update')
                },
                {
                    path: 'update',
                    name: 'users-user-update',
                    meta: {
                        label: '编辑用户'
                    },
                    component: () => import('@/modules/users/user/Update')
                }
            ]
        },
        {
            path: 'group',
            name: 'users-group',
            meta: {
                label: '用户组'
            },
            component: () => import('@/modules/users/group/List'),
            children: [
                {
                    path: 'create',
                    name: 'users-group-create',
                    meta: {
                        label: '创建用户'
                    },
                    component: () => import('@/modules/users/group/Update')
                },
                {
                    path: 'update',
                    name: 'users-group-update',
                    meta: {
                        label: '编辑用户'
                    },
                    component: () => import('@/modules/users/group/Update')
                }
            ]
        }
    ]
};
