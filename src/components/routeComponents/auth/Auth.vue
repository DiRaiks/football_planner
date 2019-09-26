<template>
    <div class="auth">
        <div class="authWr">
            <h1>Footbal planner</h1>
            <div class="inputWr">
                <Input placeholder="Login" type="text" label="Login" v-model="login"/>
                <Input placeholder="Password" type="password" label="Password" v-model="password"/>
                <Button class="loginButton" text="Log In" viewType="positive" @onClick="auth"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

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

    @Action('authorization', { namespace })
    private authorization!: any;

    protected auth(): void {
        const {login, password} = this;
        this.authorization({ login, password });
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

        & .inputWr {
            margin-top: 40px;

            & .loginButton {
                margin-top: 10px;
            }
        }
    }
</style>
