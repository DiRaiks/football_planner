import { GetterTree } from 'vuex';

import { TableState, RootState, PeopleItem } from '../types';

export const getters: GetterTree<TableState, RootState> = {
    getPeopleData: (state): object[] => state.peopleData,
    getMinimum: (state): number => state.minimum,
    getPeopleDataCount: (state): number => {
        const peopleData = state.peopleData;
        let count = 0;

        peopleData.forEach((item: PeopleItem) => {
            count += item.friends.length;
        });
        return count + peopleData.length;
    },
    getFriendsColspan: (state): number => {
        const peopleData = state.peopleData;

        let maxColspan = 0;
        peopleData.forEach((item: PeopleItem) => {
            if (maxColspan < item.friends.length) {
                maxColspan = item.friends.length;
            }
        });
        return maxColspan;
    },
    getEvent: (state): object => state.event,
};
