import { GetterTree } from 'vuex';

import { AuthState, RootState, UserObj } from '../types';

export const getters: GetterTree<AuthState, RootState> = {
    getIsAuth: (state): boolean => state.isAuth,
    getCurrentUser: (state): UserObj | null => state.user,
};
