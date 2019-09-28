import { MutationTree } from 'vuex';

import { TableState, PeopleItem, EventItem } from '../types';

export const mutations: MutationTree<TableState> = {
    setPeopleData(state, newData: PeopleItem[]) { state.peopleData = newData; },
    setMinimum(state, newMinimum: number) { state.minimum = newMinimum; },
    setEvent(state, event: EventItem) { state.event = event; },
};
