import { GetterTree } from 'vuex';

import { EventsState, RootState, EventItem } from '../types';

export const getters: GetterTree<EventsState, RootState> = {
    getCurrentEvent: (state): EventItem | null => state.currentEvent,
    getEvents: (state): EventItem[] | null => state.events,
    getActiveEvents: (state): EventItem[] | null => {
        if (!state.events) return [];
        const activeEvents: EventItem[] = state.events.filter((event: EventItem) => {
            if (new Date(event.date) >= new Date()) return event;
        });
        return activeEvents;
    },
    getOldEvents: (state): EventItem[] | null => {
        if (!state.events) return [];
        const oldEvents: EventItem[] = state.events.filter((event: EventItem) => {
            if (new Date(event.date) < new Date()) return event;
        });
        return oldEvents;
    },
};
