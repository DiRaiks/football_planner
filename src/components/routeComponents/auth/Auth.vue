<template>
    <div class="auth">
        <div class="authWr">
            <h1>Football planner</h1>
            <div>
                <a @click="clickLoginLink" :class="loginLinkClass" href="#">Логин</a>
                <a @click="clickRegistrationLink" :class="regLinkClass" href="#">Регистрация</a>
            </div>
            <div class="inputWr">
                <Input placeholder="Login" type="text" label="Login" v-model="login"/>
                <Input placeholder="Password" type="password" label="Password" v-model="password"/>
                <Button v-if="isLogin" class="authButton loginButton" text="Log In" viewType="positive"
                        @onClick="loginHandler"/>
                <Button v-else class="authButton regButton" text="Registration" viewType="positive"
                        @onClick="registrationHandler"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Action} from 'vuex-class';

import Input from '@/components/reusableComponents/input/Input.vue';
import Button from '@/components/reusableComponents/button/Button.vue';

const namespace: string = 'auth';

@Component({
    components: {
        Input,
        Button,
    },
})
export default class Auth extends Vue {
    private login: string = '';
    private password: string = '';
    private isLogin: boolean = true;

    @Action('loginUser', {namespace})
    private loginUser!: any;
    @Action('registrationUser', {namespace})
    private registrationUser!: any;

    get loginLinkClass(): object {
        return {
            loginLink: true,
            active: this.isLogin,
        };
    }

    get regLinkClass(): object {
        return {
            active: !this.isLogin,
        };
    }

    protected loginHandler(): void {
        const {login, password} = this;
        this.loginUser({login, password});
    }

    protected registrationHandler(): void {
        const {login, password} = this;
        this.registrationUser({login, password});
    }

    protected clickLoginLink(event: any): void {
        event.preventDefault();

        this.isLogin = true;
    }

    protected clickRegistrationLink(event: any): void {
        event.preventDefault();

        this.isLogin = false;
    }
}
</script>

<style scoped lang="scss">
    .auth {
        display: flex;
        height: 100%;
        align-items: center;
    }

    .authWr {
        margin: 0 auto;

        .inputWr {
            margin-top: 40px;

            .authButton {
                margin-top: 10px;
            }
        }

        a {
            text-decoration: none;
            color: black;
        }

        a.active {
            border-bottom: 2px solid black;
        }

        .loginLink {
            margin-right: 20px;
        }
    }
</style>
