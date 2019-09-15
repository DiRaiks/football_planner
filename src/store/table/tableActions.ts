import { ActionTree } from 'vuex';

import { TableState, RootState } from '../types';

export const actions: ActionTree<TableState, RootState> = {
    setPeopleData({commit, getters}, newPeople: object) {
        const peoples = getters.getPeopleData;
        const newPeopleData = [...peoples, newPeople];
        commit('setPeopleData', newPeopleData);
    },
};
