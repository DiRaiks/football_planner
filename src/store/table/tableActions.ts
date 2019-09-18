import { ActionTree } from 'vuex';

import { getPeopleData, savePeople, deletePeople } from './tableApi';

import { TableState, RootState, PeopleItem } from '../types';

export const actions: ActionTree<TableState, RootState> = {
    async setPeopleData({commit, getters}, newPeople: PeopleItem) {
        const peoples = getters.getPeopleData;

        try {
            const savedPeople = await savePeople({ ...newPeople, date: '21.11.12' });
            const newPeopleData = [...peoples, savedPeople];

            commit('setPeopleData', newPeopleData);
        } catch (error) {
            commit('setError');
        }
    },
    async deletePeople({commit}, id: string) {
        try {
            const newPeopleData = await deletePeople(id);

            commit('setPeopleData', newPeopleData);
        } catch (error) {
            commit('setError');
        }
    },
    async getPeopleData({commit}) {
        try {
            const peoplesData = await getPeopleData();

            commit('setPeopleData', peoplesData);
        } catch (error) {
            commit('setError');
        }
    },
};
