import { GetterTree } from 'vuex';

import { AuthState, RootState } from '../types';

export const getters: GetterTree<AuthState, RootState> = {
    getIsAuth: (state): boolean => state.isAuth,
};
