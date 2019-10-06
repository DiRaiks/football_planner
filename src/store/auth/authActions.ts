import { ActionTree } from 'vuex';

import { loginRequest, getCurrentUserRequest, registrationRequest } from './authApi';

import { AuthState, RootState, AuthObj } from '../types';

export const actions: ActionTree<AuthState, RootState> = {
    async loginUser({ commit, dispatch }, { login, password }: AuthObj) {
        commit('setIsLoading', true);

        try {
            const { user: { token } } = await loginRequest(login, password);

            await dispatch('events/getEvents', null, { root: true });

            commit('setIsAuth', true);
            localStorage.setItem('token', token);
            commit('setIsLoading', false);
        } catch (error) {
            commit('setError');
            commit('setIsLoading', false);
        }
    },
    async getCurrentUser({ commit, dispatch }) {
        commit('setIsLoading', true);

        try {
            const { user: { token } } = await getCurrentUserRequest();

            await dispatch('events/getEvents', null, { root: true });

            commit('setIsAuth', true);
            localStorage.setItem('token', token);
            commit('setIsLoading', false);
        } catch (error) {
            commit('setError');
            commit('setIsLoading', false);
        }
    },
    async registrationUser({ commit, dispatch }, { login, password }: AuthObj) {
        commit('setIsLoading', true);

        try {
            const { user: { token } } = await registrationRequest(login, password);

            await dispatch('events/getEvents', null, { root: true });

            commit('setIsAuth', true);
            localStorage.setItem('token', token);
            commit('setIsLoading', false);
        } catch (error) {
            commit('setError');
            commit('setIsLoading', false);
        }
    },
};
