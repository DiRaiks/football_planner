import Vue from 'vue';
import Router from 'vue-router';
import EventPage from '@/components/routeComponents/eventPage/EventPage.vue';
import AllEvents from '@/components/routeComponents/allEvents/AllEvents.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'allEvents',
      component: AllEvents,
    },
    {
      path: '/event',
      name: 'eventPage',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/components/routeComponents/eventPage/EventPage.vue'),
    },
  ],
});
