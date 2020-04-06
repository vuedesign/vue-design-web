<template>
    <auth-inner title="注册" class="auth-register">
        <el-form :model="formData"
            :rules="rules"
            ref="registerForm">
            <el-form-item prop="phone">
                <el-input v-model="formData.phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="username">
                <el-input v-model="formData.username" placeholder="用户名称"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="formData.password" placeholder="登录密码"></el-input>
            </el-form-item>
            <el-form-item prop="checkPassword">
                <el-input v-model="formData.checkPassword" placeholder="重复密码"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="remember">
                    <span><el-checkbox v-model="formData.remember" label="记住密码" name="type"></el-checkbox></span>
                    <el-button type="text" @click="handleLoginClick">登录</el-button>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%;" @click="handleConfrimClick('registerForm')">注 册</el-button>
            </el-form-item>
        </el-form>
    </auth-inner>
</template>

<script>
import AuthInner from '../components/AuthInner';
import * as constants from '../constants';
import register from '../validates/register';

export default {
    name: 'auth-register',
    mixins: [register],
    components: { AuthInner },
    data() {
        return {
            constants,
            formData: {
                phone: '',
                username: '',
                password: '',
                checkPassword: '',
                remember: true
            }
        };
    },
    methods: {
        handleLoginClick() {
            this.$router.push({ name: 'auth-login' });
        },
        handleConfrimClick(formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.$store.dispatch('auth/register', this.formData);
            });
        }
    }
};
</script>

<style lang="scss">
    .auth-register{
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
