import { MutationTree } from 'vuex';

import { TableState, PeopleItem, EventItem } from '../types';

export const mutations: MutationTree<TableState> = {
    setPeopleData(state, newData: PeopleItem[]) { state.peopleData = newData; },
    setEvent(state, event: EventItem) { state.event = event; },
};
