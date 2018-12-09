module.exports = {
    '/generator/module GET': cxt => {
        return [
            {
                name: 'dashboard',
                label: '仪表板',
                icon: 'dashboard',
                type: 'module',
                isOpen: false
            },
            {
                name: 'generator',
                label: '生成器',
                icon: 'build',
                type: 'folder',
                isOpen: true,
                children: [
                    {
                        name: 'modules',
                        label: '模块',
                        icon: 'module',
                        type: 'module',
                        isOpen: false,
                        children: [
                            {
                                name: 'Index.vue',
                                label: '模块列表',
                                icon: 'document',
                                type: 'page'
                            },
                            {
                                name: 'Edit.vue',
                                label: '编辑模块',
                                icon: 'document',
                                type: 'page'
                            },
                            {
                                name: 'Add.vue',
                                label: '添加模块',
                                icon: 'document',
                                type: 'page'
                            },
                            {
                                name: 'View.vue',
                                label: '查看模块',
                                icon: 'document',
                                type: 'page'
                            }
                        ]
                    },
                    {
                        name: 'pages',
                        label: '页面',
                        icon: 'document',
                        type: 'module',
                        isOpen: false
                    }
                ]
            }
        ];
    }
};
