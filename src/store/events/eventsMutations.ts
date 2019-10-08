import { MutationTree } from 'vuex';

import { EventsState, EventItem } from '../types';

export const mutations: MutationTree<EventsState> = {
    setCurrentEvent(state, event: EventItem) { state.currentEvent = event; },
    setEvents(state, events: EventItem[]) { state.events = events; },
};
