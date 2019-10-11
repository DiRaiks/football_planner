import { ActionTree } from 'vuex';

import { loginRequest, getCurrentUserRequest, registrationRequest } from './authApi';

import { AuthState, RootState, AuthObj } from '../types';

export const actions: ActionTree<AuthState, RootState> = {
    async loginUser({ commit, dispatch }, { login, password }: AuthObj) {
        dispatch('loader/setIsLoading', true, { root: true });

        try {
            const { user: { token } } = await loginRequest(login, password);

            await dispatch('events/getEvents', null, { root: true });

            commit('setIsAuth', true);
            localStorage.setItem('token', token);

            dispatch('loader/setIsLoading', false, { root: true });
        } catch (error) {
            commit('setError');
            dispatch('loader/setIsLoading', false, { root: true });
        }
    },
    async getCurrentUser({ commit, dispatch }) {
        dispatch('loader/setIsLoading', true, { root: true });

        try {
            const { user: { token } } = await getCurrentUserRequest();

            await dispatch('events/getEvents', null, { root: true });

            commit('setIsAuth', true);
            localStorage.setItem('token', token);

            dispatch('loader/setIsLoading', false, { root: true });
        } catch (error) {
            commit('setError');

            dispatch('loader/setIsLoading', false, { root: true });
        }
    },
    async registrationUser({ commit, dispatch }, { login, password }: AuthObj) {
        dispatch('loader/setIsLoading', true, { root: true });

        try {
            const { user: { token } } = await registrationRequest(login, password);

            await dispatch('events/getEvents', null, { root: true });

            commit('setIsAuth', true);
            localStorage.setItem('token', token);

            dispatch('loader/setIsLoading', false, { root: true });
        } catch (error) {
            commit('setError');

            dispatch('loader/setIsLoading', false, { root: true });
        }
    },
};
