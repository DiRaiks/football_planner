import { ActionTree } from 'vuex';

import {
    getPlayersData,
    savePlayer,
    deletePlayer,
    getPlayersByDate,
} from './playersApi';

import { PlayersState, RootState, PlayerItem } from '../types';

export const actions: ActionTree<PlayersState, RootState> = {
    async setPlayersData({ commit, rootGetters }, newPeople: PlayerItem) {
        const currentEventDate = rootGetters['events/getCurrentEvent'].date;

        try {
            const savedPlayers = await savePlayer({ ...newPeople, date: currentEventDate });

            commit('setPlayersData', savedPlayers);
        } catch (error) {
            commit('setError'); // TODO: need error handler
        }
    },
    async deletePlayer({ commit, rootGetters }, id: string) {
        const currentEventDate = rootGetters['events/getCurrentEvent'].date;

        try {
            const newPlayersData = await deletePlayer(id, currentEventDate);

            commit('setPlayersData', newPlayersData);
        } catch (error) {
            commit('setError');
        }
    },
    async getPlayersData({ commit }) {
        try {
            const playersData = await getPlayersData();

            commit('setPlayersData', playersData);
        } catch (error) {
            commit('setError');
        }
    },
    async getPlayersByDate({ commit }, date: string) {
        try {
            const playersData = await getPlayersByDate(date);

            commit('setPlayersData', playersData);
        } catch (error) {
            commit('setError');
        }
    },
};
