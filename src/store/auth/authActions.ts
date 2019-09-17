import { ActionTree } from 'vuex';

import { AuthState, RootState, AuthObj } from '../types';

export const actions: ActionTree<AuthState, RootState> = {
    authorization({commit}, { login, password }: AuthObj) {
        if (login === '1111' && password === '1111') {
            commit('setIsAuth', true);
        }
    },
};
