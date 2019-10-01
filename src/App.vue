<template>
    <div id="app">
      <template v-if="isAuth">
          <Top />
          <Home/>
          <!--<div id="nav">-->
              <!--<router-link to="/">Home</router-link> |-->
              <!--<router-link to="/about">About</router-link>-->
          <!--</div>-->
          <!--<router-view/>-->
      </template>
      <template v-else>
          <Auth/>
      </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

import Top from '@/components/reusableComponents/top/Top.vue';
import Auth from '@/components/routeComponents/auth/Auth.vue';
import Home from '@/components/routeComponents/home/Home.vue';

const namespace: string = 'auth';

@Component({
  components: {
    Top,
    Auth,
    Home,
  },
})
export default class App extends Vue {
    @Action('getCurrentUser', { namespace })
    private getCurrentUser!: any;
    @Getter('getIsAuth', { namespace })
    private isAuth!: void;

    private async mounted() {
        await this.getCurrentUser();
    }
}
</script>

<style lang="scss">
html, body {
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

input, button, select, input {
  outline: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  margin: 0;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
