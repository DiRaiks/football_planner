import { Module } from 'vuex';

import { getters } from './loaderGetters';
import { mutations } from './loaderMutations';
import { actions } from './loaderActions';
import { state } from './loaderState';

import { RootState, LoaderState } from '../types';


const namespaced: boolean = true;

export const loader: Module<LoaderState, RootState> = {
    namespaced,
    getters,
    mutations,
    actions,
    state,
};
