import { ActionTree } from 'vuex';

import { ErrorsState, RootState } from '../types';

export const actions: ActionTree<ErrorsState, RootState> = {
    setError({ commit, dispatch }, { errorPayload, errorName }) {
        if (errorName !== undefined) {
            commit('setErrorName', errorName);
        }

        if (errorPayload) {
            const { url, formData } = errorPayload;

            if (url !== undefined) commit('setErrorUrl', url);
            if (formData !== undefined) commit('setErrorFormData', formData);
        }
    },
};
