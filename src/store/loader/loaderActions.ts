import { ActionTree } from 'vuex';

import { LoaderState, RootState } from '../types';

export const actions: ActionTree<LoaderState, RootState> = {
    setIsLoading({ commit, getters }, isLoading) {
        const currentIsLoading = getters.getIsLoading;

        if (isLoading === currentIsLoading) return;
        commit('setIsLoading', isLoading);
    },
};
