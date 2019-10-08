import { GetterTree } from 'vuex';

import { PlayersState, RootState, PlayerItem } from '../types';

import { countAllPLayers } from '@/utils';

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
        const playersData = getters.getPlayersData;

        return countAllPLayers(playersData);
    },
};
