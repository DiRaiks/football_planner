import { ActionTree } from 'vuex';

import { TableState, RootState, PeopleItem } from '../types';

export const actions: ActionTree<TableState, RootState> = {
    setPeopleData({commit, getters}, newPeople: object) {
        const peoples = getters.getPeopleData;
        const newPeopleData = [...peoples, newPeople];

        commit('setPeopleData', newPeopleData);
    },
    deletePeople({commit, getters}, name: string) {
        const peoples = getters.getPeopleData;
        const newPeopleData = peoples.filter((item: PeopleItem) => {
            return item.name !== name;
        });

        commit('setPeopleData', newPeopleData);
    },
};
