<template>
    <a-layout-content class="page-login">
        <a-form
            layout="inline"
            :model="formData"
            @submit="handleLogin"
            @submit.native.prevent
        >
            <a-form-item>
                <a-input v-model:value="formData.account" placeholder="用户名/手机号/邮箱">
                    <template #prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                    v-model:value="formData.password"
                    type="password"
                    placeholder="密码">
                    <template #prefix><LockOutlined style="color:rgba(0,0,0,.25)"/></template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button
                    type="primary"
                    html-type="submit"
                    :disabled="formData.account === '' || formData.password === ''"
                >
                    登录
                </a-button>
            </a-form-item>
        </a-form>
    </a-layout-content>
</template>
<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'db-project',
    setup() {
        const store = useStore();
        const formData = reactive({
            account: '18602042482',
            password: 'string'
        });

        const handleLogin = () => {
            store.dispatch('globals/login', formData);
        };

        return {
            formData,
            handleLogin
        };
    }
};
</script>

<style scoped lang="scss">
.page-login {
    padding: 100px;
}
</style>
