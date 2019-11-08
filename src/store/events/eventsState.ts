import { EventsState } from '../types';

export const state: EventsState = {
    currentEventId: null,
    events: null,
    isAddEventPending: false,
    isEditEventPending: false,
    isDeleteEventPending: [],
    isSelectEventPending: [],
};
