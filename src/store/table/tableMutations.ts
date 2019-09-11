import { MutationTree } from 'vuex';

import { TableState } from '../types';

export const mutations: MutationTree<TableState> = {
    setPeopleData(state, newData: object[]) { state.peopleData = newData; },
};
