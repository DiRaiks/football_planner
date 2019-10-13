import { MutationTree } from 'vuex';

import { AuthState, UserObj } from '../types';

export const mutations: MutationTree<AuthState> = {
    setIsAuth(state, isAuth: boolean) { state.isAuth = isAuth; },
    setCurrentUser(state, user: UserObj) { state.user = user; },
};
