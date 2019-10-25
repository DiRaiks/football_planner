import { MutationTree } from 'vuex';

import { ErrorsState } from '../types';

export const mutations: MutationTree<ErrorsState> = {
    setErrorName(state, errorName) {
        state.name = errorName;
    },
    setErrorUrl(state, url) {
        state.lastErrorUrl = url.split('?')[0]; // need to clip access token and time stamp
    },
    setErrorFormData(state, formData) {
        state.lastFormData = formData;
    },
};
