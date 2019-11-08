import { Route } from 'vue-router';
import store from '@/store';

export default (to: Route, from: Route, next: any) => {
  if (!from.name && to.name === 'eventPage') {
    store.dispatch('loader/setIsNeedGlobalLoader', true);
  }

  next();
};
