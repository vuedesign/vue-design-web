/**
 * Created by wujian on 2018/3/18.
 */

export default {
    path: 'auth',
    name: 'auth',
    meta: { label: '项目' },
    component: () => import('./pages/Index'),
    redirect: { name: 'auth-login' },
    children: [
        {
            path: 'login',
            name: 'auth-login',
            meta: {
                label: '项目列表'
            },
            component: () => import('./pages/Login')
        },
        {
            path: 'register',
            name: 'auth-register',
            meta: {
                label: '项目列表'
            },
            component: () => import('./pages/Register')
        }
    ]
};
