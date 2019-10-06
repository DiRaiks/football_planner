import { MutationTree } from 'vuex';

import { EventsState, EventItem } from '../types';

export const mutations: MutationTree<EventsState> = {
    setEvent(state, event: EventItem) { state.event = event; },
};
