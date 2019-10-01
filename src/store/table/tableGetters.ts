import { GetterTree } from 'vuex';

import { TableState, RootState, PeopleItem } from '../types';

export const getters: GetterTree<TableState, RootState> = {
    getPeopleData: (state): object[] => state.peopleData,
    getPeopleDataCount: (state): number => {
        const peopleData = state.peopleData;
        let count = 0;

        peopleData.forEach((item: PeopleItem) => {
            count += item.friends.length;
        });
        return count + peopleData.length;
    },
    getCurrentEvent: (state): object => state.event,
    getAllPeople: (state, getters): object[] => {
        let allPeopleArray = [];
        const peopleData = getters.getPeopleData;
        for (const value of peopleData) {
            allPeopleArray.push(value);
            if (value.friends.length) {
                const friendsArray = value.friends.map((friend: string) => {
                    return { name: friend, status: value.status };
                });
                allPeopleArray = allPeopleArray.concat(friendsArray);
            }
        }
        const emptyArray = new Array(22 - allPeopleArray.length).fill(0);
        return allPeopleArray.concat(emptyArray);
    },
};
