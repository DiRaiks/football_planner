import { MutationTree } from 'vuex';

import { LoaderState } from '../types';

export const mutations: MutationTree<LoaderState> = {
    setIsLoading(state, isLoading: boolean) { state.isLoading = isLoading; },
    setIsNeedGlobalLoader(state, isNeed: boolean) { state.isNeedGlobalLoader = isNeed; },
};
