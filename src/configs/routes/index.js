/**
 * 注：vued依赖本文件, 不能删
 */

import root from '@/configs/routes/root';
import admin from '@/configs/routes/admin';

export default [
    {
        path: '/',
        name: 'HelloWorld',
        component: () => import('@/components/Home')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/modules/Admin'),
        children: admin
    },
    ...root,
    {
        path: '*',
        redirect: '/error'
    }
];
