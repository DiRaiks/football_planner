import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import createLogger from 'vuex/dist/logger';

import { RootState } from './types';

import { table } from './table';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const pluginsList: any[] = [];

const logger = createLogger({
  collapsed: true,
});

if (debug) {
  pluginsList.push(logger);
}

const storeModules = {
  table,
};

const store: StoreOptions<RootState> = {
  modules: storeModules,
  strict: debug,
  plugins: pluginsList,
};

export default new Vuex.Store<RootState>(store);
