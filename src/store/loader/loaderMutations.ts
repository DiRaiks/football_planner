import { MutationTree } from 'vuex';

import { LoaderState } from '../types';

export const mutations: MutationTree<LoaderState> = {
    setIsLoading(state, isLoading: boolean) { state.isLoading = isLoading; },
};
