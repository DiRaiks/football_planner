import { Module } from 'vuex';

import { getters } from './playersGetters';
import { mutations } from './playersMutations';
import { actions } from './playersActions';
import { state } from './playersState';

import { RootState, PlayersState } from '../types';


const namespaced: boolean = true;

export const players: Module<PlayersState, RootState> = {
    namespaced,
    getters,
    mutations,
    actions,
    state,
};
