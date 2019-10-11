import Vue from 'vue';
import Router from 'vue-router';
import beforeEach from './beforeEach';

import EventPage from '@/components/routeComponents/eventPage/EventPage.vue';
import AllEvents from '@/components/routeComponents/allEvents/AllEvents.vue';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'allEvents',
      component: AllEvents,
    },
    {
      path: '/event/:eventId',
      name: 'eventPage',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/components/routeComponents/eventPage/EventPage.vue'),
    },
  ],
});

router.beforeEach(beforeEach);

export default router;
