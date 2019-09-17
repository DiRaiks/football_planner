import { Module } from 'vuex';

import { getters } from './authGetters';
import { mutations } from './authMutations';
import { actions } from './authActions';
import { state } from './authState';

import { RootState, AuthState } from '../types';


const namespaced: boolean = true;

export const auth: Module<AuthState, RootState> = {
    namespaced,
    getters,
    mutations,
    actions,
    state,
};
