import { MutationTree } from 'vuex';

import { AuthState, PlayerItem, UserObj } from '../types';

export const mutations: MutationTree<AuthState> = {
    setIsAuth(state, isAuth: boolean) { state.isAuth = isAuth; },
    setCurrentUser(state, user: UserObj) { state.user = user; },
    changeUser(state, newUser: UserObj) {
        if (!state.user) return;
        state.user = { ...state.user, ...newUser };
    },
};
