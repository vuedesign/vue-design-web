export default {
    data() {
        return {
            updateRules: {
                isMenu: [
                    {
                        required: true,
                        message: '请输入选择菜单',
                        trigger: 'blur'
                    }
                ],
                name: [
                    { required: true, message: '请输入模块名称', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入模块描述', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                ]
            }
        };
    }
};
