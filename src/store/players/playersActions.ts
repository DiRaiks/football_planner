import { ActionTree } from 'vuex';

import {
    getPlayersData,
    savePlayer,
    deletePlayer,
    getPlayersByDate,
    getPlayersByEvent,
    changePlayer,
} from './playersApi';

import { PlayersState, RootState, PlayerItem } from '../types';

export const actions: ActionTree<PlayersState, RootState> = {
    async setNewPlayer({ commit, getters, rootGetters, dispatch }, newPeople: PlayerItem) {
        commit('setIsAddPlayerPending', true);
        const currentEvent = rootGetters['events/getCurrentEvent'];
        const currentEventId = currentEvent._id;
        const currentEventDate = currentEvent.date;
        const currentUser = rootGetters['auth/getCurrentUser'];

        try {
            const { players, event } = await savePlayer({
                ...newPeople,
                eventId: currentEventId,
                date: currentEventDate,
                userId: currentUser._id,
            });
            commit('setPlayersData', players);

            await dispatch('events/changeEventPlayersAmount', {
                playersAmount: event.playersAmount,
                eventId: event._id,
            }, { root: true });
            commit('setIsAddPlayerPending', false);
        } catch (error) {
            commit('setError'); // TODO: need error handler
            commit('setIsAddPlayerPending', false);
        }
    },
    async deletePlayer({ commit, rootGetters, dispatch }, id: string) {
        commit('setIsDeletePlayerPending', true);
        const currentEventId = rootGetters['events/getCurrentEvent']._id;

        try {
            const { players, event } = await deletePlayer(id, currentEventId);
            commit('setPlayersData', players);

            await dispatch('events/changeEventPlayersAmount', {
                playersAmount: event.playersAmount,
                eventId: event._id,
            }, { root: true });
            commit('setIsDeletePlayerPending', false);
        } catch (error) {
            commit('setError');
            commit('setIsDeletePlayerPending', false);
        }
    },
    async changePlayer({ commit, dispatch }, newPlayer: PlayerItem) {
        commit('setIsEditPlayerPending', true);

        try {
            const changedPlayer = await changePlayer(newPlayer._id, newPlayer);

            commit('changePlayer', changedPlayer);

            await dispatch('changeEventPlayersCount');
            commit('setIsEditPlayerPending', false);
        } catch (error) {
            commit('setError');
            commit('setIsEditPlayerPending', false);
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
