import { Module } from 'vuex';

import { getters } from './errorsGetters';
import { mutations } from './errorsMutations';
import { actions } from './errorsActions';
import { state } from './errorsState';

import { RootState, ErrorsState } from '../types';


const namespaced: boolean = true;

export const errors: Module<ErrorsState, RootState> = {
    namespaced,
    getters,
    mutations,
    actions,
    state,
};
