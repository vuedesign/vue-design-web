export default {
    data() {
        return {
            updateRules: {
                name: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
                    { validator: this.validateName, trigger: 'blur' }
                ],
                description: [
                    { required: false, message: '请输入项目描述', trigger: 'blur' },
                    { min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur' }
                ],
                thumb: [
                    { required: false, message: '请选择活动区域', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        validateName(rule, value, callback) {
            console.log('validateName', value);
            this.$store.dispatch('project/check', {
                field: 'name',
                value,
                uuid: this.$route.params.uuid
            }).then(res => {
                const errText = res ? new Error('项目名称已存在！') : undefined;
                callback(errText);
            });
        }
    }
};
