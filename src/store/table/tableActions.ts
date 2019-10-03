import { ActionTree } from 'vuex';

import {
    getPeopleData,
    savePeople,
    deletePeople,
    saveEvent,
    getPeopleByDate,
    getEvents,
    deleteEvent,
    saveEventMinimum,
} from './tableApi';

import { TableState, RootState, PeopleItem } from '../types';

export const actions: ActionTree<TableState, RootState> = {
    async setPeopleData({ commit, getters }, newPeople: PeopleItem) {
        const currentEventDate = getters.getCurrentEvent.date;

        try {
            const savedPeople = await savePeople({ ...newPeople, date: currentEventDate });

            commit('setPeopleData', savedPeople);
        } catch (error) {
            commit('setError'); // TODO: need error handler
        }
    },
    async deletePeople({ commit, getters }, id: string) {
        const currentEventDate = getters.getCurrentEvent.date;

        try {
            const newPeopleData = await deletePeople(id, currentEventDate);

            commit('setPeopleData', newPeopleData);
        } catch (error) {
            commit('setError');
        }
    },
    async getPeopleData({ commit }) {
        try {
            const peoplesData = await getPeopleData();

            commit('setPeopleData', peoplesData);
        } catch (error) {
            commit('setError');
        }
    },
    async setEvent({ commit }, { time, place, date, minimum }) {
        try {
            const savedEvent = await saveEvent(time, place, date, minimum);

            commit('setEvent', savedEvent);
        } catch (error) {
            commit('setError');
        }
    },
    async getEvents({ commit, dispatch }) {
        try {
            const events = await getEvents();

            const firstEvent = events[0];

            if (firstEvent) await dispatch('getPeopleByDate', firstEvent.date);

            commit('setEvent', firstEvent);
        } catch (error) {
            commit('setEvent', null);

            commit('setError');
        }
    },
    async deleteEvent({ commit, getters }) {
        try {
            const currentEvent = getters.getCurrentEvent;

            await deleteEvent(currentEvent._id);

            commit('setEvent', null);
        } catch (error) {
            commit('setError');
        }
    },
    async getPeopleByDate({ commit }, date: string) {
        try {
            const peoplesData = await getPeopleByDate(date);

            commit('setPeopleData', peoplesData);
        } catch (error) {
            commit('setError');
        }
    },
    async setEventMinimum({ commit, getters}, minimum: number) {
        const currentEvent = getters.getCurrentEvent;

        try {
            const newEvent = await saveEventMinimum(currentEvent._id, minimum);

            commit('setEvent', newEvent);
        } catch (error) {
            commit('setError');
        }
    },
};
