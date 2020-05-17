/**
 * Created by wujian on 2018/3/18.
 */

export default {
    path: 'project',
    name: 'project',
    meta: { label: '项目' },
    component: () => import(/* webpackChunkName: "project" */ './pages/Index'),
    redirect: { name: 'project-list' },
    children: [
        {
            path: 'list',
            name: 'project-list',
            meta: {
                label: '项目列表'
            },
            component: () => import(/* webpackChunkName: "project" */ './pages/List')
        },
        {
            path: 'add',
            name: 'project-add',
            meta: {
                label: '新建项目'
            },
            component: () => import(/* webpackChunkName: "project" */ './pages/Add'),
            children: [
                {
                    path: 'cropper',
                    name: 'project-add-cropper',
                    meta: {
                        label: '图片裁剪'
                    },
                    component: () => import(/* webpackChunkName: "cropper" */ './pages/ProjectCropper')
                }
            ]
        },
        {
            path: 'edit/:uuid',
            name: 'project-edit',
            meta: {
                label: '修改项目'
            },
            component: () => import(/* webpackChunkName: "project" */ './pages/Edit'),
            children: [
                {
                    path: 'cropper',
                    name: 'project-edit-cropper',
                    meta: {
                        label: '图片裁剪'
                    },
                    component: () => import(/* webpackChunkName: "cropper" */ './pages/ProjectCropper')
                }
            ]
        }
    ]
};
