import { ActionTree } from 'vuex';

import {
    getPlayersData,
    savePlayer,
    deletePlayer,
    getPlayersByDate,
    getPlayersByEvent,
} from './playersApi';

import { PlayersState, RootState, PlayerItem } from '../types';

export const actions: ActionTree<PlayersState, RootState> = {
    async setNewPlayer({ commit, getters, rootGetters, dispatch }, newPeople: PlayerItem) {
        const currentEvent = rootGetters['events/getCurrentEvent'];
        const currentEventId = currentEvent._id;
        const currentEventDate = currentEvent.date;
        const currentUser = rootGetters['auth/getCurrentUser'];

        try {
            const savedPlayers = await savePlayer({
                ...newPeople,
                eventId: currentEventId,
                date: currentEventDate,
                userId: currentUser._id,
            });
            commit('setPlayersData', savedPlayers);

            await dispatch('changeEventPlayersCount');
        } catch (error) {
            commit('setError'); // TODO: need error handler
        }
    },
    async deletePlayer({ commit, rootGetters, dispatch }, id: string) {
        const currentEventId = rootGetters['events/getCurrentEvent']._id;

        try {
            const newPlayersData = await deletePlayer(id, currentEventId);
            commit('setPlayersData', newPlayersData);

            await dispatch('changeEventPlayersCount');
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
    async getPlayersByEvent({ commit }, eventId: string) {
        try {
            const playersData = await getPlayersByEvent(eventId);

            commit('setPlayersData', playersData);
        } catch (error) {
            commit('setError');
        }
    },
    async changeEventPlayersCount({ commit, getters, rootGetters, dispatch }) {
        const playersDataCount = getters.getPlayersDataCount;
        const currentEvent = rootGetters['events/getCurrentEvent'];

        try {
            const newEvent = { ...currentEvent, playersAmount: playersDataCount };

            await dispatch('events/changeEvent', newEvent, { root: true });
        } catch (error) {
            commit('setError');
        }
    },
};
