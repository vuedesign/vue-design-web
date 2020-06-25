export default {
    data() {
        return {
            updateRules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                ]
            }
        };
    }
};
