import { MutationTree } from 'vuex';

import {AuthState} from '../types';

export const mutations: MutationTree<AuthState> = {
    setIsAuth(state, isAuth: boolean) { state.isAuth = isAuth; },
};
