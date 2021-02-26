<template>
    <a-layout-content class="page-login">
        <div class="page-login-inner">
            <div class="page-login-left">
                <div class="page-login-left-inner">
                    <a-divider orientation="left">
                        登录
                    </a-divider>
                    <a-form
                        layout="horizontal"
                        :model="formData"
                        :wrapper-col="wrapperCol"
                    >
                        <a-form-item
                            class="login-item"
                        >
                            <a-input
                                v-model:value="formData.account"
                                placeholder="用户名/手机号/邮箱"
                            >
                                <template #prefix>
                                    <UserOutlined style="color:rgba(0,0,0,.25)" />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item
                            class="login-item"
                        >
                            <a-input
                                v-model:value="formData.password"
                                type="password"
                                placeholder="密码"
                            >
                                <template #prefix>
                                    <LockOutlined style="color:rgba(0,0,0,.25)" />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item class="login-item">
                            <a-button
                                block
                                type="primary"
                                :disabled="formData.account === '' || formData.password === ''"
                                @click="handleLogin"
                            >
                                登 录
                            </a-button>
                            <a-button
                                block
                                type="link"
                                @click="handleGotoRegister"
                            >
                                注 册
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <div class="page-login-right" />
        </div>
    </a-layout-content>
</template>
<script>
import { reactive, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'login',
    components: {
        UserOutlined,
        LockOutlined
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const formData = reactive({
            account: '18602042482',
            password: 'string'
        });

        const handleLogin = () => {
            store.dispatch('globals/login', formData);
        };

        const handleGotoRegister = () => {
            router.push({
                name: 'register'
            });
        };

        return {
            formData,
            handleLogin,
            handleGotoRegister,
            wrapperCol: { span: 24 }
        };
    }
});
</script>

<style scoped lang="scss">
.page-login {
    padding: 100px;
}

.page-login-inner {
    width: 800px;
    margin: 0 auto;
    display: flex;
    min-height: 300px;;
}

.page-login-right {
    flex: 1;
}
.page-login-left {
    width: 300px;
}

.page-login-left-inner {
    border: 1px solid #eee;
    height: 100%;
    padding: 20px 40px 0 40px;
}

</style>
<style lang="scss">
.page-login {
    .login-item {
        > div {
            width: 100%;
        }
    }
}
</style>
