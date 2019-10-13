import { ActionTree } from 'vuex';

import {
    saveEvent,
    getEvents,
    deleteEvent,
    saveEventMinimum,
    changeEvent,
} from './eventsApi';

import { EventsState, RootState, EventItem } from '../types';

export const actions: ActionTree<EventsState, RootState> = {
    async setCurrentEvent({ commit, getters, dispatch }, eventId: string) {
        dispatch('loader/setIsLoading', true, { root: true });

        const events = getters.getEvents;
        try {
            const currentEvent = events.find((event: EventItem) => event._id === eventId);
            commit('setCurrentEvent', currentEvent);

            await dispatch('players/getPlayersByEvent', currentEvent._id, { root: true });

            dispatch('loader/setIsLoading', false, { root: true });
        } catch (error) {
            commit('setError');

            dispatch('loader/setIsLoading', false, { root: true });
        }
    },
    async saveNewEvent({ commit, rootGetters }, { time, place, date, minimum, eventName }) {
        const playersAmount = rootGetters['events/getPlayersDataCount'];
        const user = rootGetters['auth/getCurrentUser'];

        try {
            const event: EventItem = { time, place, date, minimum, eventName, playersAmount };
            const savedEvents = await saveEvent(event, user._id);

            commit('setEvents', savedEvents);
        } catch (error) {
            commit('setError');
        }
    },
    async getEvents({ commit }) {
        try {
            const events = await getEvents();

            commit('setEvents', events);
        } catch (error) {
            commit('setCurrentEvent', null);

            commit('setError');
        }
    },
    async deleteEvent({ commit, getters }, eventId) {
        try {
            const events = await deleteEvent(eventId);

            commit('setEvents', events);
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
    async changeEvent({ commit }, newEvent) {
        try {
            const changedEvent = await changeEvent(newEvent._id, newEvent);

            commit('changeEvent', changedEvent);
        } catch (error) {
            commit('setError');
        }
    },
};
