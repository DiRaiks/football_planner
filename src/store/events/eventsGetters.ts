import { GetterTree } from 'vuex';

import { EventsState, RootState, EventItem } from '../types';

export const getters: GetterTree<EventsState, RootState> = {
    getCurrentEvent: (state): EventItem | null => state.currentEvent,
    getEvents: (state): EventItem[] | null => state.events,
    getActiveEvents: (state): EventItem[] | null => {
        if (!state.events) return [];
        const nowMonth = new Date().getMonth();
        const nowDay = new Date().getDate();
        const nowYear = new Date().getFullYear();

        return state.events.filter((event: EventItem) => {
            if (new Date(event.date) >= new Date(nowYear, nowMonth, nowDay)) return event;
        });
    },
    getOldEvents: (state): EventItem[] | null => {
        if (!state.events) return [];
        const nowMonth = new Date().getMonth();
        const nowDay = new Date().getDate();
        const nowYear = new Date().getFullYear();

        return state.events.filter((event: EventItem) => {
            if (new Date(event.date) < new Date(nowYear, nowMonth, nowDay)) return event;
        });
    },
};
