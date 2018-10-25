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
    ...admin,
    ...root,
    {
        path: '*',
        redirect: '/error'
    }
];
