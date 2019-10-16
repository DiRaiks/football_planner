<template>
    <div id="app">
        <Loader v-if="isLoading"/>
        <template>
            <template v-if="isAuth">
                <router-view/>
                <Footer/>
            </template>
            <template v-else>
                <Auth/>
            </template>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

import Footer from '@/components/reusableComponents/footer/Footer.vue';
import Auth from '@/components/routeComponents/auth/Auth.vue';
import EventPage from '@/components/routeComponents/eventPage/EventPage.vue';
import Loader from '@/components/reusableComponents/loader/Loader.vue';


@Component({
    components: {
        Footer,
        Auth,
        EventPage,
        Loader,
    },
})
export default class App extends Vue {
    @Action('setCurrentEvent', { namespace: 'events' })
    private setCurrentEvent!: any;
    @Action('getCurrentUser', { namespace: 'auth' })
    private getCurrentUser!: any;
    @Getter('getIsAuth', { namespace: 'auth' })
    private isAuth!: void;
    @Getter('getIsLoading', { namespace: 'loader' })
    private isLoading!: void;

    private async mounted() {
        await this.getCurrentUser();
    }
}
</script>

<style lang="scss">
    html,
    body {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
    }

    body {
        min-width: 320px;
        color: black;
        font-size: 16px;
        line-height: 20px;
        text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
        position: relative;
    }

    input,
    button,
    select,
    input {
        outline: none;
    }

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        position: relative;
        box-sizing: border-box;
        margin: 0;
        padding-bottom: 60px;
        height: auto;
        min-height: 100%;
    }

    /*#nav {*/
        /*padding: 30px;*/

        /*a {*/
            /*font-weight: bold;*/
            /*color: #2c3e50;*/

            /*&.router-link-exact-active {*/
                /*color: #42b983;*/
            /*}*/
        /*}*/
    /*}*/
</style>
