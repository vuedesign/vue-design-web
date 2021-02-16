import { ref } from 'vue';

export default ref([
    {
        id: 'common',
        title: '通用',
        isActive: true,
        children: [
            {
                label: '按钮',
                value: 'Button',
                draggable: true,
                options: {
                    tag: `a-button`,
                    props: {
                        type: 'primary'
                    },
                    propsOptions: {
                        type: ['primary', 'dashed', 'danger', 'link', '']
                    },
                    children: '按钮'
                }
            },
            {
                label: '图标',
                value: 'Icon',
                draggable: true
            }
        ]
    },
    {
        id: 'layout',
        title: '布局',
        isActive: true,
        children: [
            {
                label: '分割线',
                value: 'Divider',
                draggable: true
            },
            {
                label: '栅格',
                value: 'Grid',
                draggable: true
            },
            {
                label: '布局',
                value: 'Layout',
                draggable: true,
                options: {
                    tag: `a-layout`,
                    props: {
                        style: {
                            border: '1px solid #aaa',
                            backgroundColor: '#eee',
                            padding: '10px',
                            margin: '20px',
                            borderRadius: '3px'
                        }
                    },
                    children: [],
                    slot: true
                }
            },
            {
                label: '顶部布局',
                value: 'Header',
                draggable: true,
                options: {
                    tag: `a-layout-header`,
                    props: {},
                    children: '顶部布局'
                }
            },
            {
                label: '侧边栏',
                value: 'Sider',
                draggable: true,
                options: {
                    tag: `a-layout-sider`,
                    props: {},
                    children: '侧边栏'
                }
            },
            {
                label: '内容部分',
                value: 'Content',
                draggable: true,
                options: {
                    tag: `a-layout-content`,
                    props: {},
                    children: '内容部分'
                }
            },
            {
                label: '底部布局',
                value: 'Footer',
                draggable: true,
                options: {
                    tag: `a-layout-footer`,
                    props: {},
                    children: '底部布局'
                }
            },
            {
                label: '间距',
                value: 'Space',
                draggable: true
            }
        ]
    },
    {
        id: 'nav',
        title: '导航',
        isActive: true,
        children: [
            {
                label: '面包屑',
                value: 'Breadcrumb',
                draggable: true
            },
            {
                label: '下拉菜单',
                value: 'Dropdown',
                draggable: true
            },
            {
                label: '导航菜单',
                value: 'Menu',
                draggable: true
            },
            {
                label: '页头',
                value: 'PageHeader',
                draggable: true
            },
            {
                label: '分页',
                value: 'Pagination',
                draggable: true
            },
            {
                label: '步骤条',
                value: 'Steps',
                draggable: true
            }
        ]
    },
    {
        id: 'data',
        title: '数据录入',
        isActive: true,
        children: [
            {
                label: '自动完成',
                value: 'AutoComplete',
                draggable: true
            },
            {
                label: '级联选择',
                value: 'Cascader',
                draggable: true
            },
            {
                label: '多选框',
                value: 'Checkbox',
                draggable: true
            },
            {
                label: '日期选择框',
                value: 'DatePicker',
                draggable: true
            },
            {
                label: '表单',
                value: 'Form',
                draggable: true
            },
            {
                label: '输入框',
                value: 'Input',
                draggable: true
            },
            {
                label: '数字输入框',
                value: 'InputNumber',
                draggable: true
            },
            {
                label: '提及',
                value: 'Mentions',
                draggable: true
            },
            {
                label: '单选框',
                value: 'Radio',
                draggable: true
            },
            {
                label: '评分',
                value: 'Rate',
                draggable: true
            },
            {
                label: '选择器',
                value: 'Select',
                draggable: true
            },
            {
                label: '滑动输入条',
                value: 'Slider',
                draggable: true
            },
            {
                label: '开关',
                value: 'Switch',
                draggable: true
            },
            {
                label: '时间选择框',
                value: 'TimePicker',
                draggable: true
            },
            {
                label: '穿梭框',
                value: 'Transfer',
                draggable: true
            },
            {
                label: '树选择',
                value: 'TreeSelect',
                draggable: true
            },
            {
                label: '上传',
                value: 'Upload',
                draggable: true
            }
        ]
    }
]);
