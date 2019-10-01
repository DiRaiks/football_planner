import { MutationTree } from 'vuex';

import {AuthState, PeopleItem} from '../types';

export const mutations: MutationTree<AuthState> = {
    setIsAuth(state, isAuth: boolean) { state.isAuth = isAuth; },
    setIsLoading(state, isLoading: boolean) { state.isLoading = isLoading; },
};
