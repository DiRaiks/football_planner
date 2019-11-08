import { ActionTree } from 'vuex';
import router from '@/router';

import {
    saveEvent,
    getEvents,
    deleteEvent,
    saveEventMinimum,
    changeEvent,
    getEventById,
} from './eventsApi';

import { EventsState, RootState, EventItem } from '../types';

export const actions: ActionTree<EventsState, RootState> = {
    async setCurrentEventId({ commit, getters, dispatch, rootGetters }, eventId: string) {
        const isNeedGlobalLoader = rootGetters['loader/getIsNeedGlobalLoader'];

        commit('setIsSelectEventPending', eventId);
        if (isNeedGlobalLoader) dispatch('loader/setIsLoading', true, { root: true });

        try {
            commit('setCurrentEventId', eventId);

            await dispatch('getEventById', eventId);

            await dispatch('players/getPlayersByEvent', eventId, { root: true });

            dispatch('loader/setIsLoading', false, { root: true });
            if (isNeedGlobalLoader) dispatch('loader/setIsNeedGlobalLoader', false, { root: true });

            commit('deleteIsSelectEventPending', eventId);
        } catch (error) {
            commit('setError');

            dispatch('loader/setIsLoading', false, { root: true });
            if (isNeedGlobalLoader) dispatch('loader/setIsNeedGlobalLoader', false, { root: true });

            commit('deleteIsSelectEventPending', eventId);
        }
    },
    clearCurrentEventId({ commit }) {
        commit('setCurrentEventId', null);
    },
    async saveNewEvent({ commit, rootGetters }, { time, place, date, minimum, eventName }) {
        commit('setIsAddEventPending', true);
        const playersAmount = rootGetters['events/getPlayersDataCount'] || 0;
        const user = rootGetters['auth/getCurrentUser'];

        try {
            const event: EventItem = { time, place, date, minimum, eventName, playersAmount };
            const savedEvents = await saveEvent(event, user._id);

            commit('setEvents', savedEvents);
            commit('setIsAddEventPending', false);
        } catch (error) {
            commit('setError');
            commit('setIsAddEventPending', false);
        }
    },
    async getEvents({ commit }) {
        try {
            const events = await getEvents();

            commit('setEvents', events);
        } catch (error) {
            commit('setCurrentEventId', null);

            commit('setError');
        }
    },
    async deleteEvent({ commit, getters }, eventId) {
        commit('setIsDeleteEventPending', eventId);

        try {
            const events = await deleteEvent(eventId);

            commit('setEvents', events);
            commit('deleteIsDeleteEventPending', eventId);
        } catch (error) {
            commit('setError');
            commit('deleteIsDeleteEventPending', eventId);
        }
    },
    async setEventMinimum({ commit, getters}, minimum: number) {
        const currentEvent = getters.getCurrentEvent;

        try {
            const newEvent = await saveEventMinimum(currentEvent._id, minimum);

            commit('changeEvent', newEvent);
        } catch (error) {
            commit('setError');
        }
    },
    async changeEvent({ commit }, newEvent) {
        commit('setIsEditEventPending', true);

        try {
            const changedEvent = await changeEvent(newEvent._id, newEvent);

            commit('changeEvent', changedEvent);
            commit('setIsEditEventPending', false);
        } catch (error) {
            commit('setError');
            commit('setIsEditEventPending', false);
        }
    },
    async getEventById({ commit }, id: string) {
        try {
            const event = await getEventById(id);

            commit ('changeEvent', event);
        } catch (e) {
            commit('setError');
            router.push('/');
        }
    },
};
