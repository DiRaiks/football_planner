import { ActionTree } from 'vuex';

import { loginRequest, getCurrentUserRequest, registrationRequest, changeUser } from './authApi';

import { AuthState, RootState, AuthObj, UserObj } from '../types';

export const actions: ActionTree<AuthState, RootState> = {
    async loginUser({ commit, dispatch }, { email, password }: AuthObj) {
        dispatch('loader/setIsLoading', true, { root: true });

        try {
            const { user }  = await loginRequest(email, password);
            const { token } = user;

            await dispatch('events/getEvents', null, { root: true });

            commit('setCurrentUser', user);
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
            const { user } = await getCurrentUserRequest();
            const { token } = user;

            await dispatch('events/getEvents', null, { root: true });

            commit('setCurrentUser', user);
            commit('setIsAuth', true);
            localStorage.setItem('token', token);

            dispatch('loader/setIsLoading', false, { root: true });
        } catch (error) {
            commit('setError');
            localStorage.removeItem('token');

            dispatch('loader/setIsLoading', false, { root: true });
        }
    },
    async registrationUser({ commit, dispatch }, { email, password, name }: AuthObj) {
        dispatch('loader/setIsLoading', true, { root: true });

        try {
            const { user } = await registrationRequest(email, password, name);
            const { token } = user;

            await dispatch('events/getEvents', null, { root: true });

            commit('setCurrentUser', user);
            commit('setIsAuth', true);
            localStorage.setItem('token', token);

            dispatch('loader/setIsLoading', false, { root: true });
        } catch (error) {
            commit('setError');

            dispatch('loader/setIsLoading', false, { root: true });
        }
    },
    async changeUser({ commit }, newUser: UserObj) {
        try {
            const changedUser = await changeUser(newUser._id, newUser);

            commit('changeUser', changedUser);
        } catch (error) {
            commit('setError');
        }
    },
};
