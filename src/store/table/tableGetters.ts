import { GetterTree } from 'vuex';

import { TableState, RootState } from '../types';

export const getters: GetterTree<TableState, RootState> = {
    getPeopleData: (state): object[] => state.peopleData,
    getMinimum: (state): number => state.minimum,
};
