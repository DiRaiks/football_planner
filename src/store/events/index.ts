import { Module } from 'vuex';

import { getters } from './eventsGetters';
import { mutations } from './eventsMutations';
import { actions } from './eventsActions';
import { state } from './eventsState';

import { RootState, EventsState } from '../types';


const namespaced: boolean = true;

export const events: Module<EventsState, RootState> = {
    namespaced,
    getters,
    mutations,
    actions,
    state,
};
