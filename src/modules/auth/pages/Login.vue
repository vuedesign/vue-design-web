<template>
<auth-inner title="登录" class="auth-login">
    <el-form :model="formData" :rules="constants.rules" ref="loginForm">
        <el-form-item prop="phone">
            <el-input v-model="formData.name" placeholder="手机号或用户名称"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="formData.password" placeholder="登录密码"></el-input>
        </el-form-item>
        <el-form-item>
            <div class="remember">
                <span>
                    <el-checkbox v-model="formData.remember" label="记住密码"></el-checkbox>
                </span>
                <el-button type="text" @click="handleRegisterClick">注册</el-button>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width: 100%;" @click="handleConfrimClick('loginForm')">登 录</el-button>
        </el-form-item>
    </el-form>
</auth-inner>
</template>

<script>
import AuthInner from '../components/AuthInner';
import * as constants from '../constants';

export default {
    name: 'auth-register',
    components: {
        AuthInner
    },
    data() {
        return {
            constants,
            formData: {
                name: '',
                password: '',
                remember: true
            }
        };
    },
    methods: {
        handleRegisterClick() {
            this.$router.push({
                name: 'auth-register'
            });
        },
        handleConfrimClick(formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.$store.dispatch('auth/login', this.formData);
            });
        }
    },
};
</script>

<style lang="scss">
.auth-login {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #eef5f9;
}

.remember {
    display: flex;

    span {
        flex: 1;
    }
}
</style>
