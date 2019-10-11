import { GetterTree } from 'vuex';

import { LoaderState, RootState } from '../types';

export const getters: GetterTree<LoaderState, RootState> = {
    getIsLoading: (state): boolean => state.isLoading,
};
