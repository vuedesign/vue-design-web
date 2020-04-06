export default {
    data() {
        return {
            rules: {
                phone: [
                    { required: true, message: '请输入电话号', trigger: 'blur' },
                    { min: 2, max: 44, message: '长度在 2 到 11 个字符', trigger: 'blur' }
                ],
                username: [
                  { required: true, message: '请输入用户名称', trigger: 'blur' },
                  { min: 2, max: 44, message: '长度在 2 到 44 个字符', trigger: 'blur' }
                ],
                password: { validator: this.validatePassword, trigger: 'blur' },
                checkPassword: { validator: this.validateCheckPassword, trigger: ['blur'] }
            }
        }
    },
    methods: {
        validatePassword(rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入用户密码'));
            } else if (value.length < 6) {
                callback(new Error('请输入大于或等于6未用户密码'));
            } else {
                if (this.formData.checkPassword !== '') {
                    this.$refs.registerForm.validateField('checkPassword');
                }
                callback();
            }
        },
        validateCheckPassword(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入用户密码'));
              } else {
                if (this.formData.password !== value) {
                    callback(new Error('俩次密码不一样'));
                } else {
                    callback();
                }
              }
        }
    }
}