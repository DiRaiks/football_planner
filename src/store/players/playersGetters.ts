import { GetterTree } from 'vuex';

import { PlayersState, RootState, PlayerItem } from '../types';

export const getters: GetterTree<PlayersState, RootState> = {
    getPlayersData: (state): object[] => state.playersData,
    getPlayersDataCount: (state): number => {
        const playersData = state.playersData;
        let count = 0;

        playersData.forEach((item: PlayerItem) => {
            count += item.friends.length;
        });
        return count + playersData.length;
    },
    getAllPlayers: (state, getters): object[] => {
        let allPlayersArray = [];
        const playersData = getters.getPlayersData;
        for (const value of playersData) {
            allPlayersArray.push(value);
            if (value.friends.length) {
                const friendsArray = value.friends.map((friend: string) => {
                    return { name: friend, status: value.status };
                });
                allPlayersArray = allPlayersArray.concat(friendsArray);
            }
        }
        const emptyArray = new Array(22 - allPlayersArray.length).fill(0);
        return allPlayersArray.concat(emptyArray);
    },
};
