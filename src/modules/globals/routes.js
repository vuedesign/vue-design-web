export default [
    {
        name: 'login',
        path: '/login',
        component: () => import('./pages/Login.vue')
    },
    {
        name: 'regiter',
        path: '/regiter',
        component: () => import('./pages/Regiter.vue')
    }
];
