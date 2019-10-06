import { GetterTree } from 'vuex';

import { EventsState, RootState, EventItem } from '../types';

export const getters: GetterTree<EventsState, RootState> = {
    getCurrentEvent: (state): EventItem | null => state.event,
};
