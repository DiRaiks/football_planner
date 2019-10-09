import { MutationTree } from 'vuex';

import { EventsState, EventItem } from '../types';

export const mutations: MutationTree<EventsState> = {
    setCurrentEvent(state, event: EventItem) { state.currentEvent = event; },
    setEvents(state, events: EventItem[]) { state.events = events; },
    changeEvent(state, newEvent: EventItem) {
        if (!state.events) return;
        state.events = state.events.map((event: EventItem) => {
            if (event._id === newEvent._id) {
                event = { ...newEvent };
                return event;
            }
            return event;
        });
    },
};