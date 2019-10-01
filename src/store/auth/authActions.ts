import { ActionTree } from 'vuex';

import { loginRequest, getCurrentUserRequest, registrationRequest } from './authApi';

import { AuthState, RootState, AuthObj } from '../types';

export const actions: ActionTree<AuthState, RootState> = {
    async loginUser({ commit, dispatch }, { login, password }: AuthObj) {
        try {
            const { user: { token } } = await loginRequest(login, password);

            await dispatch('table/getEvents', null, { root: true });

            commit('setIsAuth', true);
            localStorage.setItem('token', token);
        } catch (error) {
            commit('setError');
        }
    },
    async getCurrentUser({ commit, dispatch }) {
        try {
            const { user: { token } } = await getCurrentUserRequest();

            await dispatch('table/getEvents', null, { root: true });

            commit('setIsAuth', true);
            localStorage.setItem('token', token);
        } catch (error) {
            commit('setError');
        }
    },
    async registrationUser({ commit, dispatch }, { login, password }: AuthObj) {
        try {
            const { user: { token } } = await registrationRequest(login, password);

            await dispatch('table/getEvents', null, { root: true });

            commit('setIsAuth', true);
            localStorage.setItem('token', token);
        } catch (error) {
            commit('setError');
        }
    },
};
