import { MutationTree } from 'vuex';

import { EventsState, EventItem } from '../types';

export const mutations: MutationTree<EventsState> = {
    setCurrentEventId(state, eventId: string) { state.currentEventId = eventId; },
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
    setIsAddEventPending(state, isPending: boolean) { state.isAddEventPending = isPending; },
    setIsEditEventPending(state, isPending: boolean) { state.isEditEventPending = isPending; },
    setIsDeleteEventPending(state, eventId: string) { state.isDeleteEventPending.push(eventId); },
    deleteIsDeleteEventPending(state, eventId: string) {
        state.isDeleteEventPending = state.isDeleteEventPending.filter((id: string) => id !== eventId);
    },
    setIsSelectEventPending(state, eventId: string) { state.isSelectEventPending.push(eventId); },
    deleteIsSelectEventPending(state, eventId: string) {
        state.isSelectEventPending = state.isSelectEventPending.filter((id: string) => id !== eventId);
    },
};
