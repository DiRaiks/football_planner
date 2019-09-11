import { Module } from 'vuex';

import { getters } from './tableGetters';
import { mutations } from './tableMutations';
import { actions } from './tableActions';
import { state } from './tableState';

import { RootState, TableState } from '../types';


const namespaced: boolean = true;

export const table: Module<TableState, RootState> = {
    namespaced,
    getters,
    mutations,
    actions,
    state,
};
