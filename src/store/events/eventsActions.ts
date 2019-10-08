import { ActionTree } from 'vuex';

import {
    saveEvent,
    getEvents,
    deleteEvent,
    saveEventMinimum,
} from './eventsApi';

import { EventsState, RootState } from '../types';

export const actions: ActionTree<EventsState, RootState> = {
    async setCurrentEvent({ commit }, { time, place, date, minimum }) {
        try {
            const savedEvent = await saveEvent(time, place, date, minimum);

            commit('setCurrentEvent', savedEvent);
        } catch (error) {
            commit('setError');
        }
    },
    async getEvents({ commit, dispatch }) {
        try {
            const events = await getEvents();
            commit('setEvents', events);

            const firstEvent = events[0];

            if (firstEvent) await dispatch('players/getPlayersByDate', firstEvent.date, { root: true });

            commit('setCurrentEvent', firstEvent);
        } catch (error) {
            commit('setCurrentEvent', null);

            commit('setError');
        }
    },
    async deleteEvent({ commit, getters }) {
        try {
            const currentEvent = getters.getCurrentEvent;

            await deleteEvent(currentEvent._id);

            commit('setCurrentEvent', null);
        } catch (error) {
            commit('setError');
        }
    },
    async setEventMinimum({ commit, getters}, minimum: number) {
        const currentEvent = getters.getCurrentEvent;

        try {
            const newEvent = await saveEventMinimum(currentEvent._id, minimum);

            commit('setCurrentEvent', newEvent);
        } catch (error) {
            commit('setError');
        }
    },
};
