import { MutationTree } from 'vuex';

import { TableState, PeopleItem } from '../types';

export const mutations: MutationTree<TableState> = {
    setPeopleData(state, newData: PeopleItem[]) { state.peopleData = newData; },
    setMinimum(state, newMinimum: number) { state.minimum = newMinimum; },
    setPlace(state, place: string) { state.place = place; },
    setTime(state, time: string) { state.time = time; },
};
