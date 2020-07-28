import { Module } from 'vuex';

import { getters } from './weatherGetters';
import { mutations } from './weatherMutations';
import { actions } from './weatherActions';
import { state } from './weatherState';

import { RootState, WeatherState } from '../types';


const namespaced: boolean = true;

export const weather: Module<WeatherState, RootState> = {
    namespaced,
    getters,
    mutations,
    actions,
    state,
};
